import { Body, Controller, Post } from '@nestjs/common';
import { AiHelperService } from './ai-helper.service';
import { Auth } from '../users/guard/auth.guard';
import { AIHelperDto } from './dto/ai-helper.dto';

@Controller('ai-helper')
export class AiHelperController {
  constructor(private readonly aiHelperService: AiHelperService) {}

  @Auth()
  @Post()
  async getAnswer(@Body() dto: AIHelperDto) {
    return await this.aiHelperService.getAnswerFromChat(dto);
  }
}
