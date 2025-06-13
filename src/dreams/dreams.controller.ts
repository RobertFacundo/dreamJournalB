import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { DreamsService } from './dreams.service';
import { CreateDreamDto } from './dto/create-dream.dto';
import { UpdateDreamDto } from './dto/update-dream.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: { id: number };
}

@UseGuards(JwtAuthGuard)
@Controller('dreams')
export class DreamsController {
  constructor(private readonly dreamsService: DreamsService) { }

  @Post()
  create(@Body() dto: CreateDreamDto, @Req() req: AuthRequest) {
    return this.dreamsService.create(dto, req.user.id);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.dreamsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.dreamsService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDreamDto,
    @Req() req: AuthRequest,
  ) {
    return this.dreamsService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.dreamsService.remove(id, req.user.id);
  }

}
