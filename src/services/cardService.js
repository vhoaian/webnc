import http from "./httpService";
import { apiLocation } from "../config.json";

const endpoint = apiLocation + "/boards";

function getAllCards(board_id) {
  return http.get(`${endpoint}/${board_id}/cards`);
}

function getCard(board_id, id) {
  return http.get(`${endpoint}/${board_id}/cards/${id}`);
}
function addNewCard(board_id, { content, type }) {
  return http.post(`${endpoint}/${board_id}/cards`, { content, type });
}

function updateCard(board_id, id, body) {
  return http.put(`${endpoint}/${board_id}/cards/${id}`, body);
}

function deleteCard(board_id, id) {
  return http.delete(`${endpoint}/${board_id}/cards/${id}`);
}

export default {
  getAllCards,
  getCard,
  addNewCard,
  updateCard,
  deleteCard,
};
