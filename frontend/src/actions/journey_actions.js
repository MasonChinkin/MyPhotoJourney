import * as JourneysUtils from '../util/journeys_util';

export const RECEIVE_JOURNEY = "RECEIVE_JOURNEY";
export const RECEIVE_JOURNEY_ERRORS = "RECEIVE_JOURNEY_ERRORS";

export const receiveJourney = journeyPayload => ({
  type: RECEIVE_JOURNEY,
  journeyPayload
});

export const receiveErrors = errs => ({
  type: RECEIVE_JOURNEY_ERRORS,
  errs
});

export const requestJourney = id => dispatch => (
  JourneysUtils.fetchJourney(id)
    .then(journeyPayload => dispatch(receiveJourney(journeyPayload)))
    .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const createJourney = JourneyPayload => dispatch => (
  JourneysUtils.postJourney(JourneyPayload)
    .then(journeyPayload => dispatch(receiveJourney({journey: journeyPayload.data})))
    .catch(err => dispatch(receiveErrors(err.response.data)))
);