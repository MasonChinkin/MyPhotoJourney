import axios from 'axios';

export const getLocationData = data => {
  return axios.post("/api/geodata/", data);
}