import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'users' })
@Index(['address', 'wallet_type'], { unique: true })
export class User {
  @PrimaryGeneratedColumn({ comment: '自增主键' })
  id: number;

  @Column({ length: 70, comment: '钱包地址' })
  address: string;

  @Column({ length: 40, comment: '钱包类型，例如:metamask' })
  wallet_type: string;

  @Column({ length: 128, comment: '头像', nullable: true })
  avatar: string;

  @Column({ length: 40, comment: '昵称', nullable: true })
  @Index()
  nick_name: string;

  @Column({ length: 128, comment: 'twitter主页', nullable: true })
  twitter: string;

  @Column({ length: 128, comment: 'linked_in主页', nullable: true })
  linked_in: string;

  @Column({ length: 128, comment: 'github主页', nullable: true })
  github: string;
  @Column({ length: 128, comment: 'instagram主页', nullable: true })
  instagram: string;
  @Column({ length: 128, comment: 'facebook主页', nullable: true })
  facebook: string;
  @Column({ length: 128, comment: 'telegram账号', nullable: true })
  telegram: string;
  @Column({ length: 128, comment: 'discord账号', nullable: true })
  discord: string;
  @Column({ type: 'datetime', default: '2022-10-30 00:00:00' })
  created_at: Date;
  @Column({ type: 'datetime', default: '2599-01-01 00:00:00' })
  @Index()
  deleted_at: Date;
}
