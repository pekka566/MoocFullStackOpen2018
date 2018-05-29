import axios from 'axios';
const baseUrl = '/api/users';
let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default { getAll, create, setToken, update };
