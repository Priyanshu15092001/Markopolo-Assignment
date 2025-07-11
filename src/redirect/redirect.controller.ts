import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from '../url/url.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('r') // 👈 no /api here
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortCode')
  @ApiExcludeEndpoint()
  async redirectToOriginal(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ) {
    const originalUrl = await this.urlService.redirectToOriginalUrl(shortCode);
    if (!originalUrl) throw new NotFoundException('Short URL not found');
    return res.redirect(originalUrl);
  }
}
