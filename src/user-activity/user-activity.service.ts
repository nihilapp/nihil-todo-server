import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class UserActivityService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly prisma: PrismaService,
    // eslint-disable-next-line no-unused-vars
    private readonly authService: AuthService
  ) {}

  async activityCheck(userId: number): Promise<boolean> {
    const userActivity = await this.prisma.userActivity.findUnique({
      where: { userId, },
    });

    return userActivity.isLoggedIn;
  }
}
