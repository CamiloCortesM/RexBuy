import axios from 'axios';

const rexbuyAxios = axios.create({
  baseURL: '/api',
});

export default rexbuyAxios;
