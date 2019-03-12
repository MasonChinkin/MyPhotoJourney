import axios from 'axios';

export const postPhoto = (photo) => {
  return axios.post('/api/photos', photo)
}