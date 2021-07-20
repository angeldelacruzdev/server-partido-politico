import { Elector, ElectorSchema } from './../schemas/electores.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ElectoresService } from './electores.service';
import { ElectoresController } from './electores.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Elector.name, schema: ElectorSchema }]),
  ],
  providers: [ElectoresService],
  controllers: [ElectoresController],
})
export class ElectoresModule {}
