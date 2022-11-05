import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getError, ErrorCode } from 'src/constans/ErrorCode';
import { verifyUserToken } from '@lib/jwt';
import redis from '@lib/redis';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['x-token'];

      console.log(token);
      const msg = await verifyUserToken(token);
      console.log(111, msg, msg ? 0 : 1);
      if (msg) {
        throw new HttpException(
          getError(msg, ErrorCode.TOKEN_ERROR, null),
          HttpStatus.FORBIDDEN,
        );
      }
      const userStr = await redis.get(token);
      const user = JSON.parse(userStr);
      switch (req.method.toLowerCase()) {
        case 'get':
          req.query = Object.assign(req.query, { loginUser: user });
          break;
        default:
          req.body = Object.assign(req.body, { loginUser: user });
          break;
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(
        getError('token invalid', ErrorCode.TOKEN_ERROR, null),
        HttpStatus.OK,
      );
    }
    next();
  }
}
