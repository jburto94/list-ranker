import axios from "axios";

const baseUrl = 'http://localhost:5000/api/login/';

export const login = async credentials => (
  await axios.post(baseUrl, credentials)
);