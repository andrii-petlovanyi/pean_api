import { IsString, MaxLength, MinLength } from 'class-validator';

export class UsersDto {
  @MinLength(3, {
    message: 'Nickname must be more than 3 characters',
  })
  @IsString()
  nickname: string;

  @MinLength(8, {
    message: 'Password length must be min 8 characters',
  })
  @MaxLength(32, {
    message: 'Password length must be less than 32 characters',
  })
  @IsString()
  password: string;
}
