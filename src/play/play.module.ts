import { Module } from '@nestjs/common';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';
import { Play } from './play.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Play])],
  controllers: [PlayController],
  providers: [PlayService],
})
export class PlayModule {}
