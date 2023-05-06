import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LogsDocument = Logs & mongoose.Document;

@Schema()
export class Logs {
  @Prop({ required: true })
  _id: string;

  @Prop()
  user: string;

  @Prop()
  action: string;

  @Prop()
  unixDate: number;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);
