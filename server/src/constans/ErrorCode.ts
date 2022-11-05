export enum ErrorCode {
  SUCESS = 0,
  ERROR = 1, //请求错误
  TOKEN_ERROR = 2, //无效token
  PARAMS_ERROR = 3, //参数错误
}
export function getSucess(data) {
  return {
    code: ErrorCode.SUCESS,
    data,
    msg: 'sucess',
  };
}
export function getError(msg, code = ErrorCode.ERROR, data = null) {
  return {
    code,
    data,
    msg: msg,
  };
}
