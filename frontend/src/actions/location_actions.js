import { getLocationData } from "../util/location_util";

export const RECEIVE_LOCATION_INFO = "RECEIVE_LOCATION_INFO";
export const RECEIVE_LOCATION_ERRORS = "RECEIVE_LOCATION_ERRORS";

export const receiveLocationInfo = (info) => {
  return({
    type: RECEIVE_LOCATION_INFO,
    info
  })
}

export const receiveLocationErrors = (errors) => {
  return({
    type: RECEIVE_LOCATION_ERRORS,
    errors
  })
}