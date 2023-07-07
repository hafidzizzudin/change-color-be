import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ColorService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DatabaseModule,
    ColorsModule,
  ],
  controllers: [AppController],
  providers: [ColorService],
})
export class AppModule {}
