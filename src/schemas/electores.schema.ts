import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Usuario } from './usuario.schema';

export type ElectorDocument = Elector & Document;

@Schema()
export class Elector {
  @Prop()
  nombre: string;

  @Prop({ unique: true })
  cedula: string;

  @Prop()
  direccion: string;

  @Prop()   
  telefono: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  })
  usuario: Usuario;
}

export const ElectorSchema = SchemaFactory.createForClass(Elector);
