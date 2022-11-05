import * as jwt from 'jsonwebtoken';
import { getConfig } from '@config/index';
import redis from '@lib/redis';
import { User } from '@entity/user';
import * as moment from 'moment';
export async function createUserToken(user: User): Promise<string> {
  const jwtConfig = getConfig('jwt');
  const data = {
    address: user.address,
    expiresIn: moment().unix() + jwtConfig.expiresIn,
  };
  const token: string = jwt.sign(data, jwtConfig.secret);
  //缓存管理员数据
  await redis.set(token, JSON.stringify(data), 'EX', jwtConfig.expiresIn);
  return token;
}
export async function verifyUserToken(
  token: string | string[],
): Promise<string> {
  const jwtConfig = getConfig('jwt');
  if (!token) {
    return '无效token';
  }
  const decoded = jwt.verify(token, jwtConfig.secret);
  if (!decoded || !decoded.address) {
    return '无效token';
  }
  const userStr = await redis.get(token);

  if (!userStr) {
    return 'token 已过期';
  }
  console.log(userStr, typeof userStr);
  const user = JSON.parse(userStr);
  if (moment().unix() > user.expiresIn) {
    return 'token 已过期';
  }
  return '';
}
