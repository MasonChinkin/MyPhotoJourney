import axios from 'axios';

export const fetchJourney = id => {
  return axios.get(`/api/journeys/${id}`);
};

export const postJourney = journey => {
  return axios.post(`/api/journeys`, journey);
};

export const getUserJourneys = userId => {
  return axios.get(`/api/journeys/user/${userId}`);
};

export const destroyJourney = journeyId => {
  return axios.delete(`/api/journeys/${journeyId}`);
};