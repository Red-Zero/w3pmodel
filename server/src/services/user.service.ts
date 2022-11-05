import { UserFollowing } from '@entity/user_following';
import { Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { FOLLOWINGSTATUS } from 'src/constans/FollowIngStatus';
import AppDataSource from 'src/dbsource';
import { User } from 'src/entity/user';
import { In, Not } from 'typeorm';

@Injectable()
export class UserService {
  /**
   * Metamask登录
   * @param addr 钱包地址
   * @param sign 钱包签名
   * @param time 签名时间戳
   * @param message 签名信息
   * @returns
   */

  /**
   * //获取用户信息
   * @param addr 钱包地址
   * @param wallet_type 钱包类型
   * @returns
   */
  async getUser(address, wallet_type): Promise<User> {
    return await AppDataSource.manager.findOne(User, {
      select: [
        'address',
        'avatar',
        'nick_name',
        'wallet_type',
        'ranks',
        'twitter',
        'telegram',
        'discord',
        'company',
        'profession',
      ],
      where: {
        address,
        wallet_type,
      },
    });
  }
  async updateUser(userModel: any): Promise<User> {
    const user = await AppDataSource.manager.findOne(User, {
      where: {
        address: userModel.address,
        wallet_type: userModel.wallet_type,
      },
    });
    if (!user) {
      return null;
    }
    user.nick_name = userModel.nick_name || '';
    user.twitter = userModel.twitter || '';
    user.telegram = userModel.telegram || '';
    user.discord = userModel.discord || '';
    user.ranks = userModel.ranks || '';
    user.company = userModel.company || '';
    user.profession = userModel.profession || '';

    await AppDataSource.manager.save(User, user);
    return user;
  }

  async userFollowing(address: string, following_address: string) {
    await AppDataSource.transaction(async (manager) => {
      let uf = await manager.findOne(UserFollowing, {
        where: {
          user_address: address,
          following_address,
        },
      });
      if (!uf) {
        uf = new UserFollowing();
        uf.user_address = address;
        uf.following_address = following_address;
        uf.status = FOLLOWINGSTATUS.FOLLOWING;
      }
      const pairdata = await manager.findOne(UserFollowing, {
        where: {
          user_address: following_address,
          following_address: address,
        },
      });
      if (pairdata && pairdata.status != FOLLOWINGSTATUS.NONE) {
        pairdata.status = FOLLOWINGSTATUS.FOLLOWING_TOGETHER;
        await manager.save(pairdata);
        uf.status = FOLLOWINGSTATUS.FOLLOWING_TOGETHER;
      }
      await manager.save(uf);
    });

    return {};
  }
  async followingList(address: string, page = 1) {
    console.log(address);
    const datas = await AppDataSource.manager.find(UserFollowing, {
      where: {
        user_address: address,
        status: Not(FOLLOWINGSTATUS.NONE),
      },
      take: 10,
      skip: (page - 1) * 10,
    });
    const addresses = [];
    for (const item of datas) {
      addresses.push(item.following_address);
    }
    const users = await AppDataSource.manager.find(User, {
      select: [
        'address',
        'avatar',
        'nick_name',
        'wallet_type',
        'ranks',
        'twitter',
        'telegram',
        'discord',
        'company',
        'profession',
      ],
      where: {
        address: In(addresses),
      },
    });
    return { users, page };
  }
  async followingCancel(address: string, following_address: string) {
    await AppDataSource.transaction(async (manager) => {
      const uf = await manager.findOne(UserFollowing, {
        where: {
          user_address: address,
          following_address,
        },
      });
      if (uf) {
        uf.status = FOLLOWINGSTATUS.NONE;
        await manager.save(uf);
      }
      const pairdata = await manager.findOne(UserFollowing, {
        where: {
          user_address: following_address,
          following_address: address,
        },
      });
      if (pairdata && pairdata.status == FOLLOWINGSTATUS.FOLLOWING_TOGETHER) {
        pairdata.status = FOLLOWINGSTATUS.FOLLOWING;
        await manager.save(pairdata);
      }
    });

    return {};
  }
}
