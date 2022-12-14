import { Injectable } from '@nestjs/common';
import AppDataSource from 'src/dbsource';
import * as moment from 'moment';
import { ethers } from 'ethers';
import { User } from 'src/entity/user';
import WALLET_TYPE from 'src/constans/walletType';
import { createUserToken } from '@lib/jwt';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  /**
   * Metamask登录
   * @param addr 钱包地址
   * @param sign 钱包签名
   * @param time 签名时间戳
   * @param message 签名信息
   * @returns
   */
  async Metamasklogin(
    address: string,
    sign: string,
    time: number,
    message: string,
  ): Promise<any> {
    MetamaskSignVerify(address, sign, time, message);
    //查找用户
    let user = await AppDataSource.manager.findOne(User, {
      where: {
        address,
        wallet_type: WALLET_TYPE.MetaMask,
      },
    });
    //若不存在，则创建
    if (!user) {
      user = new User();
      user.address = address;
      user.wallet_type = WALLET_TYPE.MetaMask;
      user.company = '';
      user.profession = '';
      user.created_at = moment().toDate();
      user.updated_at = user.created_at;
      user = await AppDataSource.manager.save(User, user);
    }
    const token = await createUserToken(user);
    return { user, token };
  }
}

/**
 * Metamask 验签
 * @param addr 钱包地址
 * @param sign 钱包签名
 * @param time 签名时间戳
 * @param message 签名信息
 * @returns
 */
function MetamaskSignVerify(
  addr: string,
  sign: string,
  time: number,
  message: string,
) {
  // 验证签名
  if (moment.unix(time) < moment().subtract(2, 'm')) {
    throw new Error('签名过期');
  }
  const signMessage = message || `JUST LOGIN ${time}`;
  const recoveredAddress = ethers.utils.verifyMessage(signMessage, sign);
  if (addr !== recoveredAddress) {
    throw new Error('签名验证失败');
  }
  return true;
}
