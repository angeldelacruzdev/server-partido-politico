import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  async guardarUsuario(@Body() data: any) {
    return await this.usuariosService.guardarUsuario(data);
  }

  @Put(':id')
  async actualizarUsuario(@Body() data: any, @Param('id') id: string) {
    return await this.usuariosService.actualizarUsuario(data, id);
  }

  @Get()
  async buscarTodosUsuarios() {
    return await this.usuariosService.buscarTodosUsuarios();
  }
  @Get(':id')
  async obtenerUsuarioPorId(@Param('id') id: string) {
    return await this.usuariosService.obtenerUsuarioPorId(id);
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id') id: string) {
    return await this.usuariosService.eliminarUsuario(id);
  }
}
