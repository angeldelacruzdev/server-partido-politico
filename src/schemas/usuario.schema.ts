import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Elector } from './electores.schema';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: ['coordinador', 'admin'],
    default: 'coordinador',
  })
  role: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Elector' }] })
  elector: Elector[];

  @Prop({ default: true })
  estado: boolean;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
