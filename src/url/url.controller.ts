// src/url/url.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateShortenUrlDto } from './dto/create-shorten-url.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/types/request-with-user.interface';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
  ApiOperation
} from '@nestjs/swagger';

@ApiTags('URL Shortener')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  
  @Throttle({ default: { limit: 2, ttl: 10000 } })
  @Post('shorten')
  @ApiCreatedResponse({ description: 'Short URL created successfully' })
  @ApiOperation({
    summary: 'Shorten a URL',
    description: 'Rate limit: 2 requests per 10 seconds',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests. Please wait and try again.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiConflictResponse({ description: 'Custom code already exists' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async shortenUrl(
    @Body() body: CreateShortenUrlDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user['userId'];
    return this.urlService.createShortUrl(body.url, body.customCode, userId);
  }

  
  @Throttle({
    default: {
      limit: 5,
      ttl: 30000,
    },
  })
  @Get('stats/:shortCode')
  @ApiOperation({
    summary: 'Get stats for a short URL',
    description: 'Rate limit: 5 requests per 30 seconds',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests. Please wait.',
  })
  @ApiOkResponse({ description: 'URL stats retrieved successfully' })
  @ApiNotFoundResponse({ description: 'URL not found or access denied' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getStats(@Param('shortCode') shortCode: string, @Req() req: RequestWithUser) {
    const userId = req.user['userId'];
    return this.urlService.getUrlStats(shortCode, userId);
  }


}
