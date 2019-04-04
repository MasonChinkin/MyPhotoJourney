import { getLocationData } from "../util/location_util";

export const RECEIVE_LOCATION_DATA = "RECEIVE_LOCATION_DATA";
export const CLEAR_LOCATION_DATA = "CLEAR_LOCATION_DATA"
export const RECEIVE_LOCATION_ERRORS = "RECEIVE_LOCATION_ERRORS";

export const receiveLocationData = (data, idx) => {
  return({
    type: RECEIVE_LOCATION_DATA,
    data,
    idx
  })
}

export const receiveLocationErrors = (errors, idx) => {
  return({
    type: RECEIVE_LOCATION_ERRORS,
    errors,
    idx
  })
}

export const clearLocationData = () => {
  return({
    type: CLEAR_LOCATION_DATA
  })
}

export const fetchLocationData = (data, idx) => dispatch => {
  return getLocationData(data)
    .then( (res) => {dispatch(receiveLocationData(res.data, idx));})
    .catch( (err) => {dispatch(receiveLocationErrors(err.response.data, idx));})
}