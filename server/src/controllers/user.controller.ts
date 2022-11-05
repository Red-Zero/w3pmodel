import { BodyValidation } from '@lib/paramValidation';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { getError, getSucess } from 'src/constans/ErrorCode';
import { UserService } from '../services/user.service';

@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/info')
  @HttpCode(200)
  async getUser(@BodyValidation({ rules: { address: 'required' } }) body) {
    try {
      const { address } = body;
      const wallet_type = body.wallet_type || 'metamask';
      const data = await this.userService.getUser(address, wallet_type);
      return getSucess(data);
    } catch (err) {
      console.log(err.stack);
      return getError(err.msg, null);
    }
  }
  @Post('/user/update')
  @HttpCode(200)
  async updateUser(@BodyValidation({ rules: { user: 'required' } }) body) {
    try {
      const { user } = body;
      const data = await this.userService.updateUser(user);
      return getSucess(data);
    } catch (err) {
      console.log(err.stack);
      return getError(err.msg, null);
    }
  }
  @Post('/user/following')
  @HttpCode(200)
  async following(
    @BodyValidation({ rules: { following_address: 'required' } }) body,
  ) {
    try {
      const { loginUser, following_address } = body;
      if (loginUser.address.toLowerCase() === following_address.toLowerCase()) {
        return getError('不能关注自己', null);
      }
      const data = await this.userService.userFollowing(
        loginUser.address,
        following_address,
      );
      return getSucess(data);
    } catch (err) {
      console.log(err.stack);
      return getError(err.msg, null);
    }
  }
  @Post('/user/following/list')
  @HttpCode(200)
  async followingList(@Body() body) {
    try {
      const { loginUser } = body;
      console.log(loginUser);
      const data = await this.userService.followingList(loginUser.address);
      return getSucess(data);
    } catch (err) {
      console.log(err.stack);
      return getError(err.msg, null);
    }
  }
  @Post('/user/following/cancel')
  @HttpCode(200)
  async followingCencel(
    @BodyValidation({ rules: { following_address: 'required' } }) body,
  ) {
    try {
      const { loginUser, following_address } = body;
      if (loginUser.address.toLowerCase() === following_address.toLowerCase()) {
        return getError('不能关注自己', null);
      }
      const data = await this.userService.followingCancel(
        loginUser.address,
        following_address,
      );
      return getSucess(data);
    } catch (err) {
      console.log(err.stack);
      return getError(err.msg, null);
    }
  }
}
