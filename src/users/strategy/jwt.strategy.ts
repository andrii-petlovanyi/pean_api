import { PrismaService } from '../../prisma.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: { id: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (user.accessToken !== token) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
