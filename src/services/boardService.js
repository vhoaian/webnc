import http from "./httpService";
import { apiLocation } from "../config.json";

const endpoint = apiLocation + "/boards";

function getAllBoards() {
  return http.get(endpoint);
}

function getBoard(id) {
  return http.get(endpoint + `/${id}`);
}
function addNewBoard(name) {
  return http.post(endpoint, { name });
}

function updateBoard(id, body) {
  return http.put(endpoint + `/${id}`, body);
}

function deleteBoard(id, body) {
  return http.delete(endpoint + `/${id}`);
}

export default {
  getAllBoards,
  getBoard,
  addNewBoard,
  updateBoard,
  deleteBoard,
};
