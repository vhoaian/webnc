import http from "./httpService";
import { apiLocation } from "../config.json";

const endpoint = apiLocation + "/users";

function getUser(id) {
  return http.get(endpoint + `/${id}`);
}

function addNewUser(body) {
  return http.post(endpoint, body);
}

function updateUser(id, body) {
  return http.put(endpoint + `/${id}`, body);
}

async function getAvatarSrc(id) {
  const user = await getUser(id);
  return user.data.avatar ? apiLocation + "/" + user.data.avatar : null;
}

function updateAvatar(id, picture) {
  const formData = new FormData();
  formData.append("avatar", picture);
  return http.post(endpoint + "/" + id + "/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export default {
  getUser,
  addNewUser,
  updateUser,
  updateAvatar,
  getAvatarSrc,
};
