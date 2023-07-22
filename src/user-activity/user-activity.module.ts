import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserActivityService } from './user-activity.service';
import { UserActivityController } from './user-activity.controller';
import { AuthService } from '@/auth/auth.service';

@Module({
  providers: [ UserActivityService, AuthService, JwtService, ConfigService, ],
  controllers: [ UserActivityController, ],
})
export class UserActivityModule {}
