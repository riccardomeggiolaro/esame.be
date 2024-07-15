/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RequestDocument = HydratedDocument<Request>;

@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
})
export class Request {
  id?: string;
  
  @Prop()
  surname: string;

  @Prop()
  name: string;

  @Prop()
  date: Date;

  @Prop()
  amount: number;

  @Prop()
  numberRate: number;
}

export const RequestSchema = SchemaFactory.createForClass(Request);

RequestSchema.virtual('fullName').get(function() {
    return `${this.surname} ${this.name}`;
});