import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { PrismaService } from '@src/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = process.env.PORT || 3003;

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [`http://127.0.0.1:${PORT}`],
    methods: '*',
    credentials: true,
  });
  await app.listen(PORT);

  console.log(`[Server started on: \x1b[32mhttp://localhost\:${PORT}\x1b[0m]`);
}

bootstrap();
