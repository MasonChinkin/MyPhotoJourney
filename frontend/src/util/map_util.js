import * as d3 from "d3";

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
  let widthPercent = (d3.max(longs) - d3.min(longs)) / 360;

  let lats = [];
  photos.forEach(photo => lats.push(photo.latitude));
  let heightPercent = (d3.max(lats) - d3.min(lats)) / 180;

  let scale = widthPercent * 2 > heightPercent ? "width" : "height";
  let widthScale = 1 / widthPercent / 2;
  let heightScale = 1 / heightPercent;

  return scale === "width" ? widthScale : heightScale;
};

// export const getTopLeft = photos => {
//   let longs = [];
//   photos.forEach(photo => longs.push(photo.longitude));
//   let topLong = d3.max(longs);

//   let lats = [];
//   photos.forEach(photo => lats.push(photo.latitude));
//   let leftLat = d3.min(lats);

//   console.log([topLong, leftLat]);

//   return [leftLat, topLong];
// }

// export const getBottomRight = photos => {
//   let longs = [];
//   photos.forEach(photo => longs.push(photo.longitude));
//   let bottomLong = d3.min(longs);

//   let lats = [];
//   photos.forEach(photo => lats.push(photo.latitude));
//   let rightLat = d3.max(lats);

//   return [rightLat, bottomLong];
// }

export const bubbleMouseOver = function(d) {
  d3.select(this)
    .transition("orangeHover")
    .duration(75)
    .attr("fill", "orange");

  const photo = document.getElementsByClassName(`${d.city}`)[0];
  const leftPos = photo.getBoundingClientRect().left;
  const topPos = photo.getBoundingClientRect().top;

  //Update the tooltip position and value
  d3.select("#tooltip")
    .style("left", leftPos - 150 + "px")
    .style("top", topPos + 10 + "px")
    .select("#city")
    .text(d.city);

  d3.select("#tooltip")
    .select("#description")
    .text(() => {
      return d.description ? d.description : "";
    });

  d3.select("#tooltip")
    .select("#date")
    .text(new Date(d.photoDateTime).toLocaleDateString());

  d3.select("#tooltip")
    .select("#pic")
    .attr("src", d.photoUrl);

  //Show the tooltip
  d3.select("#tooltip").classed("hidden", false);
};

//properties of mouseout
export const bubbleMouseOut = function(d) {
  d3.select(this)
    .transition("orangeHover")
    .duration(250)
    .attr("fill", "black");

  //Hide the tooltip
  d3.select("#tooltip").classed("hidden", true);
};

// https://blockbuilder.org/veltman/fc1af365f62c0121b47fd414bf08a3d7
// draws arrows alongside journey line
export function draw(d) {
  let path = document.getElementById("line");
  let str = path.getAttribute("d");
  let length = path.getTotalLength();

  let g = d3.select(this);
  let l = 20 + (length * d) / 8; // must match number in d3.range
  let angle = angleAtLength(l);
  let end = pointAtLength(l + 20);
  let endAngle = angleAtLength(l + 20);
  let offset = [
    8 * Math.cos(angle - Math.PI / 2),
    8 * Math.sin(angle - Math.PI / 2)
  ];

  g.attr("transform", "translate(" + offset + ")")
    .append("path")
    .attr("d", str)
    .attr("stroke-dasharray", "0," + Math.max(0, l - 5) + ",20," + length);

  g.append("use")
    .attr("xlink:href", "#arrowhead")
    .attr(
      "transform",
      "translate(" + end + ") rotate(" + (endAngle * 180) / Math.PI + ")"
    );
}

function pointAtLength(l) {
  let path = document.getElementById("line");
  let xy = path.getPointAtLength(l);
  return [xy.x, xy.y];
}

// Approximate tangent
function angleAtLength(l) {
  let a = pointAtLength(Math.max(l - 0.01, 0)); // this could be slightly negative
  let b = pointAtLength(l + 0.01); // browsers cap at total length

  return Math.atan2(b[1] - a[1], b[0] - a[0]);
}
