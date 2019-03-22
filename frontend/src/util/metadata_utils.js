export const convertDate = date => {
  return date.split(" ")[0].split(":").join("-");
};

//converts latitude and longitude to decimal from degrees/minutes/seconds format. 
export const convertLatLong = latLong => { //latlong is of the form [degrees, minutes, seconds]
  return latLong[0] + latLong[1] / 60 + latLong[2] / 3600;
}