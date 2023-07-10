import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { FileModule } from './file/file.module';
import { TodosModule } from './todos/todos.module';
import { SubTodosModule } from './sub-todos/sub-todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXP: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXP: Joi.string().required(),
      }),
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    WithdrawalModule,
    FileModule,
    TodosModule,
    SubTodosModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
