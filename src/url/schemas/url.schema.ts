import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Url extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
