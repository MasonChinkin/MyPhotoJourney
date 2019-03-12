import axios from "axios";

export const postPhoto = photo => {
  return axios.post("/api/photos", photo);
};

export const uploadPhoto = form => {
  return axios.post("/api/image-upload", form);
};
