import axios from 'axios';

export const getLocationData = data => {
  return axios.get("/api/geodata/", data);
}