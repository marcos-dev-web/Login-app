import axios from '../utils/axios';

const handleToken = {
  check: async (token) => {
    const response = await axios.post('/checktoken', {
      token
    });

    return response.data;
  },
  save: (token) => {
    window.localStorage.setItem('token', token);
    return true;
  }
}

export default handleToken;