import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from '../schema/list.schema';
import { Password, PasswordSchema } from '../schema/password.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: List.name, schema: ListSchema}]),
  MongooseModule.forFeature([{ name: Password.name, schema: PasswordSchema }])
],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
