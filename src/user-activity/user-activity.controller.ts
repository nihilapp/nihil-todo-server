import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { UserActivityService } from './user-activity.service';
import { Auth } from '@/auth/decorator';
import { HttpErrorDTO } from '@/common/dto';

@Controller('user-activity')
export class UserActivityController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly userActivityService: UserActivityService) { }

  @Get('/:userId')
  @Auth([ UserRole.ADMIN, UserRole.USER, ])
  @ApiOkResponse({ description: '성공', type: Boolean, })
  @ApiUnauthorizedResponse({ description: '인증 실패', type: HttpErrorDTO, })
  @ApiOperation({
    summary: '로그인 여부',
    description: '유저의 로그인 여부를 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: Boolean,
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '유저의 id를 입력합니다.',
  })
  async activityCheck(@Param('userId') userId: number): Promise<boolean> {
    return this.userActivityService.activityCheck(userId);
  }
}
