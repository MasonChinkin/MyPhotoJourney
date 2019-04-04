import * as PhotoUtil from "../util/photo_util";

export const RECEIVE_PHOTO = "RECEIVE_PHOTO";
export const RECEIVE_PHOTOS = "RECEIVE_PHOTOS";
export const RECEIVE_PHOTO_ERRORS = "RECEIVE_PHOTO_ERRORS";
export const CLEAR_PHOTO_ERRORS = "CLEAR_PHOTO_ERRORS"

export const createPhoto = (photo) => dispatch => {
  return PhotoUtil.postPhoto(photo)
    .then((res) => {dispatch(receivePhoto(res))})
    .catch((err) => {dispatch(receivePhotoErrors(err.response.data))})
}

export const validatePhoto = (photo) => dispatch => {
  return PhotoUtil.validatePhoto(photo)
    .then(() => {dispatch(clearPhotoErrors())})
    .catch( (err) => {dispatch(receivePhotoErrors(err.response.data))})
}

export const clearPhotoErrors = () => {
  return ({
    type: CLEAR_PHOTO_ERRORS
  })
}

export const receivePhoto = (photo) => {
  return({
    type: RECEIVE_PHOTO,
    photo,
  })
}

export const receivePhotos = (photos) => {
  return({
    type: RECEIVE_PHOTOS,
    photos,
  })
}

export const receivePhotoErrors = (errors) => {
  return({
    type: RECEIVE_PHOTO_ERRORS,
    errors
  })
}