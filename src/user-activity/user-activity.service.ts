import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserActivityService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly prisma: PrismaService
  ) {}

  async activityCheck(userId: number): Promise<boolean> {
    const userActivity = await this.prisma.userActivity.findUnique({
      where: { userId, },
    });

    return userActivity.isLoggedIn;
  }
}
