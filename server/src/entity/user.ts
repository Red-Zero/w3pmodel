import WALLET_TYPE from 'src/constans/walletType';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ comment: '自增主键' })
  id: number;

  @Column({ length: 70, comment: '钱包地址' })
  @Index({ unique: true })
  address: string;

  @Column({
    length: 40,
    default: WALLET_TYPE.MetaMask,
    comment: '钱包类型，例如:metamask',
  })
  wallet_type: string;

  @Column({ length: 128, comment: '头像', default: '' })
  avatar: string;

  @Column({ length: 30, comment: '身份等级', nullable: true, default: 0 })
  ranks: string;

  @Column({ length: 40, comment: '昵称', default: '' })
  @Index({ unique: true })
  nick_name: string;

  @Column({ length: 128, comment: 'twitter主页', default: '' })
  twitter: string;

  @Column({ length: 128, comment: 'telegram账号', default: '' })
  telegram: string;

  @Column({ length: 128, comment: 'discord账号', default: '' })
  discord: string;

  @Column({ length: 50, default: '' })
  company: string;

  @Column({ length: 50, default: '' })
  profession: string;

  @Column({ type: 'datetime', default: '2022-10-30 00:00:00' })
  created_at: Date;

  @Column({ type: 'datetime', default: '2022-10-30 00:00:00' })
  updated_at: Date;

  @Column({ type: 'datetime', default: '2599-01-01 00:00:00' })
  @Index()
  deleted_at: Date;
}
