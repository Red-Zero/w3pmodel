export enum ErrorCode {
  SUCESS = 0,
  ERROR = 1,
}
export function getSucess(data) {
  return {
    code: ErrorCode.SUCESS,
    data,
    msg: 'sucess',
  };
}
export function getError(msg, data = null) {
  return {
    code: ErrorCode.ERROR,
    data,
    msg: msg,
  };
}
