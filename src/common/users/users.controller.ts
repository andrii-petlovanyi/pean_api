import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UsersDto } from '@src/common/users/dto/users.dto';
import { UsersService } from '@src/common/users/users.service';
import { CurrentUser } from '@src/common/users/decorator/user.decorator';
import { Auth } from '@src/common/users/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() dto: UsersDto) {
    return this.usersService.signIn(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signUp(@Body() dto: UsersDto) {
    return this.usersService.signUp(dto);
  }

  @Auth()
  @Get('current')
  async getCurrent(@CurrentUser() user: User) {
    return this.usersService.getCurrent(user);
  }

  @Auth()
  @Get('logout')
  async logOut(@CurrentUser() user: User) {
    return this.usersService.logOut(user);
  }
}
