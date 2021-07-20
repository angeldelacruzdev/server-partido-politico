import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ElectoresModule } from './electores/electores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/partido'),
    UsuariosModule,
    ElectoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
