import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { TemaModule } from '../tema/tema.module';
import { TemaController } from './controllers/tema.controller';
import { TemaService } from './services/tema.service';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
  providers: [TemaService],
  controllers: [TemaController],
  exports: [TemaService],
})
export class PostagemModule {}
