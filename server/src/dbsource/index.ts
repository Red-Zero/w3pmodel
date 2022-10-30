import { User } from 'src/entity/user';
import { DataSource } from 'typeorm';
import { getConfig } from '../getConfig/index';

const AppDataSource = new DataSource(getConfig('db'));
console.log(getConfig('db'));
export async function Init() {
  await AppDataSource.initialize();
  AppDataSource.manager.findOne(User, { where: {} });
}
export default AppDataSource;
