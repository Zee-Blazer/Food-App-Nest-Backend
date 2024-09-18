import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm'; // TypeOrm
import { ConfigModule } from '@nestjs/config'; // Configuration Module
import { JwtModule } from '@nestjs/jwt'; // JWT for Tokens

import { User } from './user/user.entity'; // User Entity

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [ User ],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '4h' },
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
