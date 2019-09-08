import { Test, TestingModule } from '@nestjs/testing';
import { PlayController } from './play.controller';
import { IHandlePlayBody } from './play.interface';
import * as returnMessages from './play.messages';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Play } from './play.entity';
import { PlayService } from './play.service';
import databaseConfig from '../config/database.config';

describe('Play Controller', () => {
  let controller: PlayController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        ...databaseConfig(),
        entities: [`${__dirname}/*.entity.ts`],
        dropSchema: true,
      }), TypeOrmModule.forFeature([Play])],
      controllers: [PlayController],
      providers: [PlayService],
    }).compile();

    controller = module.get<PlayController>(PlayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add first play', async () => {
    const play: IHandlePlayBody = { nickname: 'nickname', room: 'room', play: 'paper' };
    const result = await controller.handlePlay(play);
    expect(result).toBe(returnMessages.success);
  });

  it('should fail adding play from user that already played', async () => {
    const play: IHandlePlayBody = { nickname: 'nickname', room: 'room', play: 'paper' };
    const result = await controller.handlePlay(play);
    expect(result).toBe(returnMessages.invalid);
  });

  it('should add second play in the same room', async () => {
    const play: IHandlePlayBody = { nickname: 'nickname2', room: 'room', play: 'rock' };
    const result = await controller.handlePlay(play);
    expect(result).toBe(returnMessages.secondSuccess);
  });

  it('should get the first player result', async () => {
    const play = { nickname: 'nickname', room: 'room' };
    const result = await controller.getResult(play);
    expect(result).toBe('win');
  });

  it('should get the second player result', async () => {
    const play = { nickname: 'nickname2', room: 'room' };
    const result = await controller.getResult(play);
    expect(result).toBe('lose');
  });
});
