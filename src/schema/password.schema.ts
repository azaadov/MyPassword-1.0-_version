import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { List } from './list.schema';

@Schema({ timestamps: true })
export class Password extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  desc: string

  @Prop({ type: Types.ObjectId, ref: List.name, required: true })
  listId: Types.ObjectId;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);
