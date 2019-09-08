import { PlayTypes, ResultsStatus } from '../jokenpo/jokenpo.interface';

export interface IHandlePlayBody {
  room: string;
  nickname: string;
  play: PlayTypes;
  status?: ResultsStatus;
  associatedWith?: number;
}

export interface IGetResultBody {
  room: string;
  nickname: string;
}
