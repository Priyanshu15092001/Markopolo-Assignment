// src/auth/dto/login.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Your registered email',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'yourPassword',
    description: 'Your account password',
  })
  @IsString()
  password: string;
}
