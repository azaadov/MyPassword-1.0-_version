import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Password, PasswordSchema } from 'src/schema/password.schema';
import { List, ListSchema } from 'src/schema/list.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Password.name, schema: PasswordSchema },
  { name: List.name, schema: ListSchema }
  ])],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule { }
