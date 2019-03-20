import * as JourneysUtils from "../util/journeys_util";

export const RECEIVE_JOURNEY = "RECEIVE_JOURNEY";
export const CLEAR_UI_JOURNEY = "CLEAR_UI_JOURNEY";
export const RECEIVE_USER_JOURNEYS = "RECEIVE_USER_JOURNEYS";
export const RECEIVE_CURRENT_JOURNEY = "RECEIVE_CURRENT_JOURNEY";
export const RECEIVE_JOURNEY_ERRORS = "RECEIVE_JOURNEY_ERRORS";
export const RECEIVE_JOURNEY_DELETE = "RECEIVE_JOURNEY_DELETE";

export const receiveJourney = journeyPayload => {
  return {
    type: RECEIVE_JOURNEY,
    journeyPayload
  };
};

export const receiveCurrentJourney = journeyPayload => ({
  type: RECEIVE_CURRENT_JOURNEY,
  journeyPayload
});

export const receiveErrors = errs => ({
  type: RECEIVE_JOURNEY_ERRORS,
  errs
});

export const clearUIJourney = () => ({
  type: CLEAR_UI_JOURNEY
});

export const receiveJourneyDelete = journeyId => ({
  type: RECEIVE_JOURNEY_DELETE,
  journeyId
});

export const requestJourney = id => dispatch => {
  return JourneysUtils.fetchJourney(id)
    .then(journeyPayload => dispatch(receiveJourney(journeyPayload)))
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    });
};

export const createJourney = JourneyPayload => dispatch =>
  JourneysUtils.postJourney(JourneyPayload)
    .then(journeyRes =>
      dispatch(receiveCurrentJourney({ journey: journeyRes.data }))
    )
    .catch(err => dispatch(receiveErrors(err.response.data)));

export const receiveUserJourneys = currentUserJourneys => ({
  type: RECEIVE_USER_JOURNEYS,
  currentUserJourneys
});

export const fetchUserJourneys = userId => dispatch =>
  JourneysUtils.getUserJourneys(userId).then(currentUserJourneys =>
    dispatch(receiveUserJourneys(currentUserJourneys.data))
  );

export const deleteJourney = journeyId => dispatch => (
  JourneysUtils.destroyJourney(journeyId).then(({data}) => dispatch(receiveJourneyDelete(data.id)))
);