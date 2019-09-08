import * as Joi from '@hapi/joi';
import { IHandlePlayBody, IGetResultBody } from './play.interface';

const validPlay = [ 'rock', 'sissors', 'paper' ];

export const handlePlaySchema = (body: IHandlePlayBody) => Joi.validate(body, {
  room: Joi.string().required().error(() => new Error('Room is required')),
  nickname: Joi.string().required().error(() => new Error('User is required')),
  play: Joi.string().valid(validPlay).required().error((err) => {
    return new Error(`Play parameter must be one of these: ${validPlay.toString()}`);
  }),
});

export const getResultSchema = (body: IGetResultBody) => Joi.validate(body, {
  room: Joi.string().required().error(() => new Error('Room is required')),
  nickname: Joi.string().required().error(() => new Error('Room is required')),
});
