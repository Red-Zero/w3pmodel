import Cookies from "js-cookie";

const key = "wap_user_address";

export function getToken() {
  return Cookies.get(key);
}

export function setToken(address) {
  return Cookies.set(key, address);
}

export function removeToken() {
  return Cookies.remove(key);
}
