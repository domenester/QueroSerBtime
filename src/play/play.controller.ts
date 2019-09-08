import { Controller, Post, Param, HttpException, Get } from '@nestjs/common';
import { handlePlaySchema, getResultSchema } from './play.schemas';
import { PlayService } from './play.service';
import JoKenPoPlay from '../jokenpo/jokenpo';
import { IHandlePlayBody } from './play.interface';
import * as returnMessages from './play.messages';

@Controller('play')
export class PlayController {

  constructor(private readonly playService: PlayService) {}

  @Post(':room/:nickname/:play')
  async handlePlay( @Param() params: IHandlePlayBody ): Promise<string> {

    await handlePlaySchema(params).catch( err => {
      throw new HttpException(err.message, 404);
    });

    const userAlreadyPlayed = await this.playService.userAlreadyPlayed(params);
    if (userAlreadyPlayed) {
      return returnMessages.invalid;
    }

    const lastActivePlayInRoom = await this.playService.lastActivePlayInRoom(params);
    if (!lastActivePlayInRoom) {
      await this.playService.create({ ...params, status: 'active' }).catch(err => err);
      return returnMessages.success;
    }

    const secondPlay = await this.playService.create({ ...params, status: 'inactive', associatedWith: lastActivePlayInRoom.id });
    await this.playService.associateWith(lastActivePlayInRoom.id, secondPlay.id);
    await this.playService.inactivatePlay(params.room);

    return returnMessages.secondSuccess;
  }

  @Get(':room/:nickname')
  async getResult( @Param() params ): Promise<string> {
    await getResultSchema(params).catch( err => {
      throw new HttpException(err.message, 404);
    });
    const firstPlay = await this.playService.getByNickname(params.nickname, params.room);

    if (!firstPlay) {
      return 'No play found';
    }

    const playAssociated = await this.playService.getPlayAssociated(firstPlay.id);
    const jokenpo = new JoKenPoPlay(firstPlay.play, playAssociated.play);
    return jokenpo.result();
  }
}
