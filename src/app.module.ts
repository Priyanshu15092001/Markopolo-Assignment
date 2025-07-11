// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';
import { RedirectController } from './redirect/redirect.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60000,
          
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true, // make environment variables globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', { infer: true }),
        dbName: 'url-shortener',
      }),
      inject: [ConfigService],
    }),
    UrlModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [RedirectController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, 
    },
  ],

})
export class AppModule {}
