import * as d3 from "d3";

// declare above to allow passing to drawArrow function
let numArrows;

export function drawMap(state, anchor) {
  // dimensions of geojson
  const w = 960;
  const h = 491;

  let photos = state.data[1];
  // numArrows = photos.length > 1 ? photos.length : 0

  // Scale should range between 1.25 (min zoom of 1 where .8 * 1.25 = 1), with a max zoom of 10x
  let scale = Math.max(Math.min(getScale(photos), 10), 1.25);

  let center = getCenterLatLong(photos);

  // If scale is 1.25, show the whole map and center at 0,0
  if (scale === 1.25) center = [0, 0];

  //define projection
  let projection = d3
    .geoEquirectangular()

    // scale of 153 shows the entirety of the map
    // 0.8 is padding
    .scale(153 * 0.8 * scale)
    .center(center);

  //define drag behavior
  const zoom = d3
    .zoom()
    .scaleExtent([0.5, 8])
    .on("zoom", d => {
      map.selectAll("circle").attr("r", 5 / d3.event.transform.k);
      map.select(".line").attr("stroke-width", 1 / d3.event.transform.k);
      map.style("stroke-width", 1 / d3.event.transform.k + "px");
      map.attr("transform", d3.event.transform);
    });

  // define path
  const path = d3.geoPath().projection(projection);

  //create SVG
  const svg = d3
    .select(anchor)
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "svg");

  //create container for all pannable/zoomable elements
  const map = svg.append("g");

  svg.call(zoom);

  //invisible rect for dragging on whitespace
  map
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h)
    .attr("opacity", 0);

  //bind data and create one path per json feature (state)
  map
    .selectAll("path")
    .data(state.map.features)
    .enter()
    .append("path")
    .attr("class", "map-feature")
    .attr("d", path);

  //define travel line
  const line = d3
    .line()
    .x(d => projection([d.longitude, d.latitude])[0])
    .y(d => projection([d.longitude, d.latitude])[1])
    .curve(d3.curveCardinal.tension(0.4));

  //draw line
  map
    .append("path")
    .datum(photos)
    .attr("class", "line")
    .attr("id", "line")
    .attr("d", line);

  let lineForLength = document.getElementById("line")
  numArrows = Math.floor(lineForLength.getTotalLength() / 70)

  // arrows
  map
    .append("defs")
    .append("svg:path")
    .attr("id", "arrowhead")
    .attr("d", "M3,0 L-3,-3 L-3,3 Z");

  map
    .selectAll(".arrow")
    .data(d3.range(numArrows)) // argument is number of arrows
    .enter()
    .append("g")
    .attr("class", "arrow")
    .each(drawArrow);

  //bubbles for visited cities
  map
    .selectAll("circle")
    .data(photos)
    .enter()
    .append("circle")
    .attr("cx", d => projection([d.longitude, d.latitude])[0])
    .attr("cy", d => projection([d.longitude, d.latitude])[1])
    .attr("r", 5)
    .attr("class", d => `${d.city} circle`)
    .attr("fill", "black")
    .on("mouseover", bubbleMouseOver)
    .on("mouseout", bubbleMouseOut);
}

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

export const bubbleMouseOver = function (d) {
  d3.select(this)
    .transition("orangeHover")
    .duration(75)
    .attr("fill", "orange");

  const photo = document.getElementsByClassName(`${d.city}`)[0];
  const leftPos = photo.getBoundingClientRect().left;
  const topPos = photo.getBoundingClientRect().top;

  // const tooltipHeight = document.getElementById('tooltip')
  //   .getBoundingClientRect().height;

  // const tooltipWidth = document.getElementById('tooltip')
  //   .getBoundingClientRect().width;

  // // turnery flips tooltip to not dissapear off of screen
  // const xpos = (d3.event.clientX > d3.event.view.innerWidth / 2) ? leftPos - tooltipWidth : leftPos;
  // const ypos = (d3.event.clientY > d3.event.view.innerHeight / 2) ? topPos - tooltipHeight : topPos;


  //Update the tooltip position and value
  d3.select("#tooltip")
    .style("left", leftPos - 100 + "px") // 100 is half of tooltip width
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
export const bubbleMouseOut = function (d) {
  d3.select(this)
    .transition("orangeHover")
    .duration(250)
    .attr("fill", "black");

  //Hide the tooltip
  d3.select("#tooltip").classed("hidden", true);
};

// https://blockbuilder.org/veltman/fc1af365f62c0121b47fd414bf08a3d7
// draws arrows alongside journey line
export function drawArrow(d) {
  let path = document.getElementById("line");
  let str = path.getAttribute("d");
  let length = path.getTotalLength();

  let g = d3.select(this);
  let l = 20 + (length * d) / numArrows;
  let angle = angleAtLength(l);
  let end = pointAtLength(l + 15);
  let endAngle = angleAtLength(l + 15);
  let offset = [
    numArrows * Math.cos(angle - Math.PI / 2),
    numArrows * Math.sin(angle - Math.PI / 2)
  ];

  g.attr("transform", "translate(" + offset + ")")
    .append("path")
    .attr("d", str)
    .attr("stroke-dasharray", "0," + Math.max(0, l - 5) + `,${20},` + length);

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