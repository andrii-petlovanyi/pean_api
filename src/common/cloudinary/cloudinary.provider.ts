import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { CLOUDINARY } from '@src/config/cloudinary.config';
import { getCloudinaryConfig } from '@src/config/cloudinary.config';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const config = await getCloudinaryConfig(configService);
    return v2.config(config);
  },
};
