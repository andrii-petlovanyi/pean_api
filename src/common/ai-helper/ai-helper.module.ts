import { Module } from '@nestjs/common';
import { AiHelperService } from './ai-helper.service';
import { AiHelperController } from './ai-helper.controller';
import { config } from '@src/config/config';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';

export const axiosInstance = axios.create({
  baseURL: config.CHAT_GPT_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.CHAT_GPT_TOKEN}`,
  },
});

@Module({
  controllers: [AiHelperController],
  providers: [
    AiHelperService,
    HttpService,
    { provide: 'AXIOS_INSTANCE_TOKEN', useValue: axiosInstance },
  ],
})
export class AiHelperModule {}
