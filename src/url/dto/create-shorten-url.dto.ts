// src/url/dto/create-shorten-url.dto.ts

import { IsOptional, IsString, IsUrl, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortenUrlDto {
  @ApiProperty({
    description: 'The original long URL',
    example: 'https://example.com/my-long-url',
  })
  @IsString()
  @IsUrl({}, { message: 'Must be a valid URL' })
  url: string;

  @ApiProperty({
    description: 'Optional custom short code (alphanumeric only)',
    example: 'my-custom123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'customCode can only contain alphanumeric characters, dashes, and underscores',
  })
  customCode?: string;
}
