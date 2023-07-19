import { Module } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivityController } from './user-activity.controller';

@Module({
  providers: [UserActivityService],
  controllers: [UserActivityController]
})
export class UserActivityModule {}
