import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';

import { UsersDto } from '@src/common/users/dto/users.dto';
import { PrismaService } from '@src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signIn(dto: UsersDto) {
    const user = await this.validateUser(dto);
    const token = await this.issueToken(user.id);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken: token,
      },
    });

    return {
      id: user.id,
      nickname: user.nickname,
      token,
    };
  }

  async signUp(dto: UsersDto) {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        nickname: dto.nickname,
      },
    });

    if (isUserExist)
      throw new BadRequestException(
        `User with nickname ${dto.nickname} is already exists`,
      );

    const user = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        nickname: dto.nickname,
        password: await hash(dto.password),
      },
    });

    const token = await this.issueToken(user.id);

    return {
      id: user.id,
      nickname: user.nickname,
      token,
    };
  }

  getCurrent(user: User) {
    return {
      id: user.id,
      nickname: user.nickname,
      token: user.accessToken,
    };
  }

  async logOut(user: User) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken: null,
      },
    });

    return {
      message: 'You are log out successfully!',
    };
  }

  private async issueToken(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1d',
    });

    return accessToken;
  }

  private async validateUser(dto: UsersDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        nickname: dto.nickname,
      },
    });

    if (!user)
      throw new NotFoundException(
        `User with nickname ${dto.nickname} not found`,
      );

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
