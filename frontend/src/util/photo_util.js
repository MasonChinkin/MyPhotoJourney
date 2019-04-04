import axios from "axios";

export const postPhoto = photo => {
  return axios.post("/api/photos/upload", photo);
};

export const validatePhoto = photoData => {
  return axios.post("api/photos/validate", photoData);
}

export const uploadPhoto = form => {
  return axios.post("/api/image-upload", form);
};
