import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ElectoresModule } from './electores/electores.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    UsuariosModule,
    ElectoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
