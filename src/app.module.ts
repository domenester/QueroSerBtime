import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayModule } from './play/play.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      databaseConfig(),
    ),
    PlayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
