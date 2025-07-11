// src/url/url.service.ts

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/url.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<Url>,
    private readonly configService: ConfigService,
  ) {}

  private generateShortCode(length = 6): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async createShortUrl(originalUrl: string, customCode?: string, userId?: string) {
    if (!this.isValidUrl(originalUrl)) {
      throw new BadRequestException('Invalid URL format');
    }

    let shortCode = customCode;

    if (shortCode) {
      const existing = await this.urlModel.findOne({ shortCode });
      if (existing) {
        throw new ConflictException('Custom code already in use');
      }
    } else {
      do {
        shortCode = this.generateShortCode();
      } while (await this.urlModel.findOne({ shortCode }));
    }

    const newUrl = new this.urlModel({
      originalUrl,
      shortCode,
      userId, 
    });

    await newUrl.save();

    const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:3000';

    return {
      originalUrl: newUrl.originalUrl,
      shortUrl: `${baseUrl}/r/${newUrl.shortCode}`,
    };
  }

  async redirectToOriginalUrl(shortCode: string): Promise<string> {
    const urlEntry = await this.urlModel.findOne({ shortCode });

    if (!urlEntry) {
      throw new NotFoundException('Short URL not found');
    }

    urlEntry.clicks += 1;
    await urlEntry.save();

    return urlEntry.originalUrl;
  }

   async getUrlStats(shortCode: string, userId?: string) {
    const urlEntry = await this.urlModel.findOne({ shortCode });

    if (!urlEntry) {
      throw new NotFoundException('Short URL not found');
    }

    if (userId && urlEntry.userId?.toString() !== userId) {
      throw new NotFoundException('This URL does not belong to you');
    }

    const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:3000';

    return {
      originalUrl: urlEntry.originalUrl,
      shortUrl: `${baseUrl}/r/${urlEntry.shortCode}`,
      clicks: urlEntry.clicks,
    };
  }
}
