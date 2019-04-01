import { getLocationData } from "../util/location_util";

export const RECEIVE_LOCATION_DATA = "RECEIVE_LOCATION_DATA";
export const RECEIVE_LOCATION_ERRORS = "RECEIVE_LOCATION_ERRORS";

export const receiveLocationData = (data) => {
  return({
    type: RECEIVE_LOCATION_DATA,
    data
  })
}

export const receiveLocationErrors = (errors) => {
  return({
    type: RECEIVE_LOCATION_ERRORS,
    errors
  })
}

export const fetchLocationData = data => dispatch => {
  getLocationData(data).then( (res) => {
      dispatch(receiveLocationData(res.data));
  })
  .catch( (err) => {
    dispatch(receiveLocationErrors(err.response.data));
  })
}