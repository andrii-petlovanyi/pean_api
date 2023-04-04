import { JwtStrategy } from './strategy/jwt.strategy';
import { getJwtConfig } from './../config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, PrismaService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class UsersModule {}
