import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '@src/common/users/strategy/jwt.strategy';
import { getJwtConfig } from '@src/config/jwt.config';
import { PrismaService } from '@src/prisma.service';
import { UsersService } from '@src/common/users/users.service';
import { UsersController } from '@src/common/users/users.controller';

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
