import axios from "axios";
const base_url = "http://127.0.0.1:3000/";
export function metamaskLogin(
  addr: string,
  sign: string,
  time: string,
  message: string
) {
  return axios.post(`${base_url}login/metamask`, {
    addr,
    sign,
    time,
    message,
  });
}

export function getUser(address: string, wallet_type: string) {
  return axios.post(`${base_url}user/info`, {
    address,
    wallet_type,
  });
}

export function updateUser(user: any) {
  return axios.post(`${base_url}user/update`, {
    user,
  });
}
