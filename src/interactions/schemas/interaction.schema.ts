import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InteractionDocument = Interaction & Document;

@Schema()
export class Interaction {
  @Prop()
  name: string;
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
