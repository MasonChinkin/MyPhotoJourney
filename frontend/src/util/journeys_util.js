import axios from 'axios';

export const fetchJourney = id => {
  return axios.get(`/api/journeys/${id}`);
};

export const postJourney = journey => {
  return axios.post(`/api/journeys`, journey);
};