import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UsersDocument = Users & mongoose.Document;

@Schema()
export class Users {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  tokens: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
