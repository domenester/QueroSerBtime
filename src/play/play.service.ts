import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Play } from './play.entity';
import { Repository, Not } from 'typeorm';
import { IGetResultBody, IHandlePlayBody } from './play.interface';

@Injectable()
export class PlayService {
  constructor(
    @InjectRepository(Play)
    private readonly playRepository: Repository<Play>,
  ) {}

  async create(play: IHandlePlayBody): Promise<Play> {
    const playCreated = await this.playRepository.insert(play).catch(err => err);
    return playCreated.raw[0];
  }

  async inactivatePlay(room: string): Promise<Play> {
    const playToUpdate = await this.playRepository.findOne({
      where: { room, status: 'active' },
    });
    playToUpdate.status = 'inactive';
    playToUpdate.updatedAt = new Date();
    return this.playRepository.save(playToUpdate);
  }

  async associateWith(id: number, idToAssociate: number): Promise<Play> {
    const playToUpdate = await this.playRepository.findOne({
      where: { id },
    });
    playToUpdate.associatedWith = idToAssociate;
    const saved = await this.playRepository.save(playToUpdate);
    return saved;
  }

  async getResult(data: IGetResultBody): Promise<Play[]> {
    return this.playRepository.find({
      where: {
        user: data.nickname, room: data.room,
      },
    });
  }

  async lastActivePlayInRoom(play: IHandlePlayBody): Promise<Play> {
    const activePlay = await this.playRepository.findOne({
      where: {
        room: play.room, status: 'active', nickname: Not(play.nickname),
      },
      order: { createdAt: 'ASC' },
    });
    return activePlay;
  }

  async userAlreadyPlayed(play: IHandlePlayBody): Promise<boolean> {
    const userPlays = await this.playRepository.find({
      where: {
        room: play.room, status: 'active', nickname: play.nickname,
      },
    });
    return userPlays.length > 0;
  }

  async getByNickname(nickname: string, room: string): Promise<Play> {
    return this.playRepository.findOne({
      where: { nickname, room }, order: { updatedAt: 'DESC' },
    });
  }

  async getPlayAssociated(id: number): Promise<Play> {
    return this.playRepository.findOne({
      where: { associatedWith: id },
    });
  }
}
