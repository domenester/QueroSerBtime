import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PlayTypes, ResultsStatus } from 'src/jokenpo/jokenpo.interface';
import { formatTableName } from '../config/table.config';

@Entity({name: formatTableName('play')})

export class Play {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  room: string;

  @Column({ length: 10 })
  nickname: string;

  @Column('varchar')
  play: PlayTypes;

  @Column('varchar')
  status: ResultsStatus;

  @Column({ type: 'int', nullable: true })
  associatedWith?: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
