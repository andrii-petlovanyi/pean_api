import { Module } from '@nestjs/common';
import { ImageEditorService } from './image-editor.service';

@Module({
  providers: [ImageEditorService]
})
export class ImageEditorModule {}
