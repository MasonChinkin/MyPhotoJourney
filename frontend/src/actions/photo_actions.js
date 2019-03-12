import * as PhotoUtil from "../util/photo_util";

export const RECEIVE_PHOTO = "RECEIVE_PHOTO";
export const RECEIVE_PHOTOS = "RECEIVE_PHOTOS";
export const RECEIVE_PHOTO_ERRORS = "RECEIVE_PHOTO_ERRORS";

export const createPhoto = (photo) => dispatch => {
  PhotoUtil.postPhoto(photo)
    .then((res) => {dispatch(receivePhoto(res))})
    .catch((err) => {dispatch(receivePhotoErrors(err.response.data))})
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