import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Auth } from '@src/common/users/decorator/auth.decorator';
import { MetaService } from '@src/common/meta/meta.service';
import { MetaDto } from '@src/common/meta/dto/meta.dto';

@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get('/')
  async metaList(@Query('page') page: string) {
    return this.metaService.metaList(page);
  }

  @Auth()
  @Post('/')
  @UsePipes(new ValidationPipe())
  async addMeta(@Body() dto: MetaDto) {
    return this.metaService.addMeta(dto);
  }

  @Auth()
  @Delete('/:metaId')
  async deleteMeta(@Param('metaId') metaId: string) {
    return this.metaService.deleteMeta(metaId);
  }

  @Auth()
  @Patch('/:metaId')
  @UsePipes(new ValidationPipe())
  async updateMeta(@Param('metaId') metaId: string, @Body() dto: MetaDto) {
    return this.metaService.updateMeta(metaId, dto);
  }
}
