import { HttpException, HttpStatus } from '@nestjs/common';
import * as Validate from 'request-validate';

/**
 * 
 * @param validationInfo  验证信息
 * @param validationInfo.name 需要验证的request参数,如body，parmams，query,header
 * @param validationInfo.rules 验证规则,多个验证规则用 ｜ 分隔
           required: 必填字段
           numeric： 必须为数字
           array： 必须是数组
           min： 数字：最小值，字符：最小长度
           max：
           in：必须在范围内 eg: in:a,b,c
* @param message  返回消息       
 * @returns 
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ErrorCode, getError } from 'src/constans/ErrorCode';

export const BodyValidation = createParamDecorator(
  (validationInfo: any, ctx: ExecutionContext) => {
    const message = validationInfo.message || "Validation failed'";
    const request = ctx.switchToHttp().getRequest();
    try {
      console.log(request.body, validationInfo.rules);
      Validate(request.body, validationInfo.rules, message);
    } catch (err) {
      throw new HttpException(
        getError(message, ErrorCode.TOKEN_ERROR, null),
        HttpStatus.OK,
      );
    }
    return request.body;
  },
);

export const QueryValidation = createParamDecorator(
  (validationInfo: any, ctx: ExecutionContext) => {
    const message = validationInfo.message || "Validation failed'";
    const request = ctx.switchToHttp().getRequest();
    try {
      Validate(request.query, validationInfo.rules, message);
    } catch (err) {
      throw new HttpException(
        getError(message, ErrorCode.TOKEN_ERROR, null),
        HttpStatus.OK,
      );
    }
    return request.query;
  },
);
