import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ListModule } from './list/list.module';
import { PasswordModule } from './password/password.module';
import { AuthModule } from './auth/auth.module';
import { MyLogger } from './logging/custom.logger';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>({
        uri: configService.get<string>('MONGODB_URI')
      })
    }),
    ListModule,
    PasswordModule,
    AuthModule
  ],
  controllers: [],
  providers: [MyLogger],
})
export class AppModule {}
