import axios from '../utils/axios';

const handleRemembers = {
  create: async (token, title, text) => {
    const response = await axios.post('/remembers/create', {
      token,
      title,
      text
    });

    return response.data;
  },
  delete: async (id, token) => {
    const response = await axios.post('/remembers/delete', {
      id,
      token,
    });

    return response.data;
  },
  get: async (token) => {
    const response = await axios.get('/remembers', {
      token,
    });

    return response.data;
  }
};

export default handleRemembers;