import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from '@controllers/user.controller';
import { UserService } from '@services/user.service';
import { AuthMiddleware } from '@middleware/auth.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/*', method: RequestMethod.GET },
        { path: '/api/*', method: RequestMethod.POST },
        { path: '/api*', method: RequestMethod.PUT },
        { path: '/api/*', method: RequestMethod.DELETE },
      );
  }
}
