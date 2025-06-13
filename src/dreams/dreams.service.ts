import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dream } from './entities/dream.entity';
import { Repository } from 'typeorm';
import { CreateDreamDto } from './dto/create-dream.dto';
import { UpdateDreamDto } from './dto/update-dream.dto';

@Injectable()
export class DreamsService {
  constructor(
    @InjectRepository(Dream)
    private readonly dreamRepo: Repository<Dream>
  ) { }

  async create(createDreamDto: CreateDreamDto, userId: number) {
    const dream = this.dreamRepo.create({
      ...createDreamDto,
      user: { id: userId },
    });
    return this.dreamRepo.save(dream);
  }

  findAll(userId: number) {
    return this.dreamRepo.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number, userId: number) {
    const dream = await this.dreamRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!dream) throw new NotFoundException('Dream not found');
    return dream;
  }

  async update(id: number, dto: UpdateDreamDto, userId: number) {
    const dream = await this.findOne(id, userId);
    Object.assign(dream, dto);
    return this.dreamRepo.save(dream);
  }

  async remove(id: number, userId: number) {
    const dream = await this.findOne(id, userId);
    return this.dreamRepo.remove(dream);
  }
}

