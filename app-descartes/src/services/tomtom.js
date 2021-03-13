import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tomtom.com/',
});

export default api;
