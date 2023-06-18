import { Injectable } from '@nestjs/common';
import { config } from '@src/config/config';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AIHelperDto } from './dto/ai-helper.dto';

@Injectable()
export class AiHelperService {
  constructor(private httpService: HttpService) {}
  async getAnswerFromChat(dto: AIHelperDto): Promise<any> {
    const { role, question, command } = dto;

    const aiRole = role ? role : 'user';
    const content = command ? command + question : question;

    const { data } = await lastValueFrom(
      this.httpService.post('/chat/completions', {
        model: config.CHAT_GPT_MODEL,
        messages: [{ role: aiRole, content }],
        temperature: 0,
      }),
    );

    return data?.choices[0]?.message;
  }
}
