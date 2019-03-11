import * as JourneysUtils from '../util/journeys_util';

export const RECEIVE_JOURNEY = "RECEIVE_JOURNEY";

export const receiveJourney = journeyPayLoad => ({
  type: RECEIVE_JOURNEY,
  journeyPayLoad
});

export const requestJourney = id => dispatch => (
  JourneysUtils.fetchJourney(id)
    .then(journeyPayload => dispatch(receiveJourney(journeyPayload)))
    .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const createJourney = JourneyPayload => dispatch => (
  JourneysUtils.postJourney(JourneyPayload)
    .then(journeyPayload => dispatch(receiveJourney(journeyPayload)))
    .catch(err => dispatch(receiveErrors(err.response.data)))
);