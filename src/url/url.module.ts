// src/url/url.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { Url, UrlSchema } from './schemas/url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]), // register schema
  ],
  controllers: [UrlController],
  providers: [UrlService],
  exports: [UrlService],
})
export class UrlModule {}
