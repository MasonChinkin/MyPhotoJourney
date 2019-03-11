import axios from 'axios';

export const fetchJourney = id => {
  return axios.get(`/api/journeys/${id}`);
};

// journeyPayload includes photos
export const postJourney = journeyPayload => {
  return axios.post(`/api/journeys`, journeyPayload);
};