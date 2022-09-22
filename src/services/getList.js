import axios from 'axios';
import { setHeaderConfig } from '../utils/setHeaderConfig';

const baseUrl = 'http://localhost:5000/api/lists/';

export const getList = async (token, listId) => (
  await axios.get(`${baseUrl}${listId}`, setHeaderConfig(token))
);