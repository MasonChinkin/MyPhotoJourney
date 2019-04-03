import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as d3 from "d3";
import * as MapUtils from "../../util/map_util";

// const getScale = photos => {
//   let longs = [];
//   photos.forEach(photo => longs.push(photo.longitude));
//   let widthPercent = (d3.max(longs) - d3.min(longs)) / 360;

//   let lats = [];
//   photos.forEach(photo => lats.push(photo.latitude));
//   let heightPercent = (d3.max(lats) - d3.min(lats)) / 180;

//   let scale = widthPercent * 2 > heightPercent ? "width" : "height";
//   let widthScale = 1 / widthPercent / 2;
//   let heightScale = 1 / heightPercent;

//   return scale === "width" ? widthScale : heightScale;
// };
class JourneyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      map: null
    };
  }

  componentWillMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    });

    fetch("/journeys", {
      headers: myHeaders
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ map: data.map });
      });

    this.props.requestJourney(this.props.match.params.journey_id).then(data => {
      this.setState({ data: data.journeyPayload.data });
    });
  }

  componentDidUpdate() {
    if (this.state.data && this.state.map) {
      const w = 960;
      const h = 491;

      let photos = this.state.data[1];

      // Scale should range between 1.25 (min zoom of 1 where .8 * 1.25 = 1), with a max zoom of 10x
      let scale = Math.max(Math.min(MapUtils.getScale(photos), 10), 1.25);
      // let [wScale, hScale, wPercent, hPercent] = getScale(photos);
      console.log(scale);
      console.log(MapUtils.getScale(photos));

      let center = MapUtils.getCenterLatLong(photos);

      // If scale is 1.25, show the whole map and center at 0,0
      if (scale === 1.25) center = [0, 0];
      console.log(center);

      //define projection
      let projection = d3
        .geoEquirectangular()

        // .fitExtent(
        //   [
        //     [(-1 * wScale + 0.5) * ((1 - wPercent) / 2) * w, -0.4286 * h],
        //     [w * (wScale + 0.5) * ((1 - wPercent) / 2), h * hScale]
        //   ], //demo
        //   // [[-4.6 * 0.451 * w, -0.4286 * h], [w * 5.6 * 0.45, h * 3.5]], //demo
        //   // [[-5.6 * 0.451 * w, -0.4286 * h], [w * 5.6 * 0.549, h * 3.5]], //demo
        //   // [[-6.73 * 0.46 * w, -0.4478 * h], [w * 6.73 * 0.54, h * 4.78]], //demo 1
        //   // [[-2.85 * w * 0.28, 0 * h], [w * 2.85 * 0.72, h * 1.17]], //na to sa
        //   // [[(-4.35 + 0.44) * w, 0 * h], [w * (4.35 + 0.44), h * 1]], // europe to africa

        //   // [[-0.7 * w, -0.2 * h], [w * 1.3, h * 1.8]], //demo 1

        //   // [[-5.1 * w, -5.1 * 0.14 * h], [w * 5.1, h * 5.1 * 0.86]],
        //   // [[-5.1 * 0.9 * w, ((-3.5 * 0.0714 * 3) / 2) * h], [w * 5.1, h * 3.5]], //demo
        //   // [[-6.23 * 0.92 * w, -1.1 * h], [w * 6.23, h * 5.13]], //demo 1
        //   // [[-6.23 * 0.9 * w, -1.09 * 0.8 * h], [w * 6.23, h * 4.78]], //demo 1
        //   // [[-6.23 * 0.875 * w, -4.78 * 0.125 * h], [w * 6.23, h * 4.78]],
        //   // [[-1.62 * w, -1.17 * 0.125 * h], [w * 3.37, h * 1.17]], //na to sa
        //   // [[(-4.35 + 0.4426) * w, -0.095 * h], [w * (4.35 + 0.4426), h * 1.19]], // europe to africa
        //   this.state.map
        // );

        // scale of 153 shows the entirety of the map
        .scale(153 * 0.8 * scale)
        .center(center);

      // const extentTopLeft = projection(MapUtils.getTopLeft(photos)).map(el => Math.floor(-el))
      // const extentBottomRight = projection(MapUtils.getBottomRight(photos)).map(el => Math.floor(el))
      // console.log('left: ', extentTopLeft);
      // console.log('right: ', extentBottomRight);

      // projection = d3.geoEquirectangular()

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
        .select(this.refs.anchor)
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
        .data(this.state.map.features)
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

      // arrows
      map
        .append("defs")
        .append("svg:path")
        .attr("id", "arrowhead")
        .attr("d", "M5,0 L-5,-3 L-5,3 Z");

      map
        .selectAll(".arrow")
        .data(d3.range(8)) // argument is number of arrows
        .enter()
        .append("g")
        .attr("class", "arrow")
        .each(MapUtils.draw);

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
        .on("mouseover", MapUtils.bubbleMouseOver)
        .on("mouseout", MapUtils.bubbleMouseOut);
    }
  }

  render() {
    const { data } = this.state;
    if (data === null) return null;
    return (
      <>
        <div ref="anchor" />
        <div id="tooltip" className="hidden">
          <h1 id="city">placeholder</h1>
          <img id="pic" alt="" />
          <p id="date">placeholder</p>
          <p id="description">placeholder</p>
        </div>
      </>
    );
  }
}

export default withRouter(JourneyMap);
