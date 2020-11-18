import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiLocation, tokenKey } from "../config.json";

const endpoint = apiLocation + "/auth";
const endpointFacebook = apiLocation + "/auth/facebook";
const endpointGoogle = apiLocation + "/auth/google";

// Setting Authorization header to 'JWT xxxxx'
http.setJwt(getJwt());

export async function login(username, password) {
  const { data } = await http.post(endpoint, { username, password });
  const jwt = data.token;
  localStorage.setItem(tokenKey, jwt);
}

export async function loginFacebook({ token, id, name, email, pictureUrl }) {
  const { data } = await http.post(endpointFacebook, {
    token,
    id,
    name,
    email,
    pictureUrl,
  });
  const jwt = data.token;
  localStorage.setItem(tokenKey, jwt);
}

export async function loginGoogle({ token, id, name, email, pictureUrl }) {
  const { data } = await http.post(endpointGoogle, {
    token,
    id,
    name,
    email,
    pictureUrl,
  });
  const jwt = data.token;
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginFacebook,
  loginGoogle,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
