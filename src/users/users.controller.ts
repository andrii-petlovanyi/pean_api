import { UsersDto } from './dto/users.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from './decorator/user.decorator';
import { Auth } from './decorator/auth.decorator';
import { User } from '@prisma/client';

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
