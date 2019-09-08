import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'admin',
  password: 'root',
  database: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  keepConnectionAlive: true,
});
