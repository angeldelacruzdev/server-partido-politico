import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { Usuario, UsuarioDocument } from './../schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  /**
   * Guarda un  usuario
   * @param crearUsuarioDto json de usuario a guardar.
   * @returns el uusario creado.
   */
  async guardarUsuario(
    crearUsuarioDto: CrearUsuarioDto,
  ): Promise<Usuario | any> {
    try {
      crearUsuarioDto.password = await bcrypt.hash(
        crearUsuarioDto.password,
        10,
      );
      const resp = new this.usuarioModel(crearUsuarioDto);
      const doc = (await resp.save()).populate('elector');
      return {
        ok: true,
        doc,
      };
    } catch (error) {
      throw new HttpException(
        `Problema en el servidor: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *  Retorna todos los usuarios disponibles.
   * @returns retorna un array.
   */
  async buscarTodosUsuarios(): Promise<Usuario[]> {
    try {
      const resp = await this.usuarioModel.find().populate('Elector');
      return resp;
    } catch (error) {
      throw new HttpException(
        `Problema en el servidor: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Retorna un usuario.
   * @param id identificador del usuario
   * @returns retorna un objeto
   */
  async obtenerUsuarioPorId(id: string): Promise<Usuario> {
    try {
      return await this.usuarioModel.findById(id);
    } catch (error) {
      throw new HttpException(
        `Problema en el servidor: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Actualizar un usuario.
   * @param crearUsuarioDto datos para actualizar
   * @param id identificador del usuaurio
   * @method actualizarUsuario(crearUsuarioDto: CrearUsuarioDto,id: string)
   *
   */
  async actualizarUsuario(
    crearUsuarioDto: CrearUsuarioDto,
    id: string,
  ): Promise<any> {
    try {
      const doc = await this.usuarioModel.updateOne(
        {
          _id: id,
        },
        crearUsuarioDto,
      );
      doc.nModified;
      return new HttpException('Actualizado con éxito.', HttpStatus.ACCEPTED);
    } catch (error) {
      throw new HttpException(
        `Problema en el servidor: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Eliminar usuario
   * @param id identificador del usuario
   */
  async eliminarUsuario(id: string): Promise<any> {
    try {
      return await this.usuarioModel.findById(
        id,
        async (err, usuario: Usuario) => {
          if (err) throw new Error('Problemas');

          if (usuario.estado) {
            await this.usuarioModel.updateOne(
              { _id: id },
              { $set: { estado: false } },
            );
          } else {
            await this.usuarioModel.updateOne(
              { _id: id },
              { $set: { estado: true } },
            );
          }
        },
      );
    } catch (error) {
      throw new HttpException(
        `Problema en el servidor: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
