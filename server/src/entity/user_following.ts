import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'user_following' })
export class UserFollowing {
  @PrimaryGeneratedColumn({ comment: '自增主键' })
  id: number;

  @Column({ length: 70, comment: '钱包地址' })
  @Index()
  user_address: string;

  @Column({ length: 70, comment: '关注用户的钱包地址' })
  @Index()
  following_address: string;

  @Column({ comment: '关注状态,0:取关,1:关注,2:互相关注' })
  status: number;

  @Column({ type: 'datetime', default: '2022-10-30 00:00:00' })
  created_at: Date;

  @Column({ type: 'datetime', default: '2022-10-30 00:00:00' })
  updated_at: Date;

  @Column({ type: 'datetime', default: '2599-01-01 00:00:00' })
  @Index()
  deleted_at: Date;
}
