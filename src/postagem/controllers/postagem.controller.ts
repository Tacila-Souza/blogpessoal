import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    /**
     * Recupera uma única entidade Postagem pelo seu identificador único.
     * @param id - O identificador único da Postagem a ser recuperada, extraído do parâmetro da rota e automaticamente convertido para número usando ParseIntPipe.
     * O ParseIntPipe garante que o parâmetro id recebido seja convertido para número e lança um erro caso a conversão falhe.
     */
    // Busca uma postagem pelo id
    return this.postagemService.findById(id); // Chama o método findById da classe Service
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByAlltitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findAllByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postagemService.delete(id);
  }
}
