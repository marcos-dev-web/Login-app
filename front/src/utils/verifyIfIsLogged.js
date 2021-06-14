import axios from './axios.js';

const verifyIfIsLogged = async () => {
  const token = window.localStorage.getItem('token');

  if (token !== null) {
    const response = await axios.post('/checktoken', {
      token,
    });

    if (response.data.error) {
      return false;
    } else {
      return true;
    }
  } else {
      return false;
  }
}

export default verifyIfIsLogged;