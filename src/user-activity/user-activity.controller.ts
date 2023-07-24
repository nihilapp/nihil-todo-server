import {
  Body,
  Controller, Post
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { UserActivityService } from './user-activity.service';
import { Auth } from '@/auth/decorator';
import { HttpErrorDTO } from '@/common/dto';
import { UserIdDTO } from './dto/user-id.dto';

@Controller('user-activity')
export class UserActivityController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly userActivityService: UserActivityService) { }

  @Post('')
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
  @ApiBody({
    required: true,
    type: UserIdDTO,
    description: '유저 id를 담은 객체 데이터를 전달합니다.',
  })
  async activityCheck(@Body() userIdDto: UserIdDTO): Promise<boolean> {
    return this.userActivityService.activityCheck(userIdDto);
  }
}
