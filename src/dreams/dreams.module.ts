import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DreamsService } from './dreams.service';
import { DreamsController } from './dreams.controller';
import { Dream } from './entities/dream.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dream])],
  controllers: [DreamsController],
  providers: [DreamsService],
})
export class DreamsModule {}
