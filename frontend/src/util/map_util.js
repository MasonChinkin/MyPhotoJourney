import * as d3 from 'd3';

export const getCenterLatLong = photos => {
  let longs = [];
  Object.values(photos).forEach(photo => longs.push(photo.longitude));
  let centerLong = (d3.max(longs) + d3.min(longs)) / 2;

  let lats = [];
  Object.values(photos).forEach(photo => lats.push(photo.latitude));
  let centerLat = (d3.max(lats) + d3.min(lats)) / 2;

  return [centerLong, centerLat];
};

export const getScale = photos => {
  let longs = [];
  Object.values(photos).forEach(photo => longs.push(photo.longitude));
  let longDiff = d3.max(longs) - d3.min(longs);

  let lats = [];
  Object.values(photos).forEach(photo => lats.push(photo.latitude));
  let latDiff = d3.max(lats) - d3.min(lats);

  return d3.max([longDiff, latDiff]) * 30;
}