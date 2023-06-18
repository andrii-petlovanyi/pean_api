import { IsOptional, IsString, MinLength } from 'class-validator';
import { AICommands, ChatGPTModels } from '../enum/ai-helper.enum';

export class AIHelperDto {
  @MinLength(2, { message: 'Question must be at least 2 characters long' })
  @IsString({ message: 'Question  must be a string' })
  question: string;

  @IsString({ message: 'Question  must be a string' })
  @IsOptional()
  role?: ChatGPTModels;

  @IsOptional()
  command?: AICommands;
}
