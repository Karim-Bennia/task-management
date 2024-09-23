import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true, minlength: 3, maxlength: 25 })
  title: string;

  @Prop({ required: true, minlength: 10 })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
