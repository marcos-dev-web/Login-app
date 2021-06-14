import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['access-control-allow-origin'] = '*';


const instance = axios.create({
  baseURL: String(process.env.REACT_APP_BASE_URL),
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;