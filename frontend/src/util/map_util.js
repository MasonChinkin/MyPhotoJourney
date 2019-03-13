import * as d3 from 'd3';

export const getCenterLatLong = photos => {
  let longs = [];
  photos.forEach(photo => longs.push(photo.longitude));
  let centerLong = (d3.max(longs) + d3.min(longs)) / 2;

  let lats = [];
  photos.forEach(photo => lats.push(photo.latitude));
  let centerLat = (d3.max(lats) + d3.min(lats)) / 2;

  return [centerLong, centerLat];
};

export const getScale = photos => {
  let longs = [];
  photos.forEach(photo => longs.push(photo.longitude));
  let longDiff = d3.max(longs) - d3.min(longs);

  let lats = [];
  photos.forEach(photo => lats.push(photo.latitude));
  let latDiff = d3.max(lats) - d3.min(lats);

  return d3.max([longDiff, latDiff]) * 30;
}

export const bubbleMouseOver = function (d) {
  d3.select(this)
    .transition('orangeHover')
    .duration(75)
    .attr('fill', 'orange');

  const photo = document.getElementsByClassName(`${d.city}`)[0];
  const leftPos = photo.getBoundingClientRect().left;
  const topPos = photo.getBoundingClientRect().top;

  //Update the tooltip position and value
  d3.select('#tooltip')
    .style('left', (leftPos - 150) + 'px')
    .style('top', (topPos + 10) + 'px')
    .select('#city')
    .text(d.city)

  d3.select('#tooltip')
    .select('#description')
    .text(() => {
      return (d.description) ? d.description : '';
    })

  d3.select('#tooltip')
    .select('#date')
    .text(new Date(d.photoDateTime).toLocaleDateString());

  d3.select('#tooltip')
    .select('#pic')
    .attr('src', d.photoUrl);

  //Show the tooltip
  d3.select('#tooltip').classed('hidden', false);
}

//properties of mouseout
export const bubbleMouseOut = function (d) {
  d3.select(this)
    .transition('orangeHover')
    .duration(250)
    .attr('fill', 'black')

  //Hide the tooltip
  d3.select('#tooltip').classed('hidden', true)
}