import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObj) => {
  return axios.post(baseUrl, newObj);
};

const update = (id, newNumber) => {
  return axios.put(`${baseUrl}/${id}`, newNumber);
};

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, del };
