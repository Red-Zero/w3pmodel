import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { getError, getSucess } from 'src/constans/ErrorCode';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/login/metamask')
  @HttpCode(200)
  async MetamaskLogin(@Body() body) {
    try {
      const { addr, sign, time, message } = body;
      const data = await this.appService.Metamasklogin(
        addr,
        sign,
        time,
        message,
      );
      return getSucess(data);
    } catch (err) {
      console.log(err.stack);
      return getError(err.msg, null);
    }
  }
}
