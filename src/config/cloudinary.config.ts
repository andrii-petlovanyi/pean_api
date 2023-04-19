export const CLOUDINARY = 'Cloudinary';

import { ConfigService } from '@nestjs/config';

export const getCloudinaryConfig = async (
  configService: ConfigService,
): Promise<any> => ({
  provide: configService.get('CLOUD_PROVIDER'),
  cloud_name: configService.get('CLOUD_NAME'),
  api_key: configService.get('CLOUD_API_KEY'),
  api_secret: configService.get('CLOUD_API_SECRET'),
});
