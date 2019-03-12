import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as d3 from 'd3';
import * as MapUtils from '../../util/map_util';

class JourneyMap extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentWillMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    });

    fetch("http://localhost:5000/journeys", {
      headers: myHeaders,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ data });
      });

    // this.props.requestJourney(this.props.match.params.journey_id);
  }

  componentDidUpdate() {
    //Width and height
    const w = 1200;
    const h = 600;
    // const active = d3.select(null)

    let { photos } = this.state.data;

    //define projection
    const projection = d3.geoEquirectangular()
      .scale(MapUtils.getScale(photos))
      .center(MapUtils.getCenterLatLong(photos))

    //define drag behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', d => {
        map.style('stroke-width', 1 / d3.event.transform.k + 'px');
        map.attr('transform', d3.event.transform);
      });

    // define path
    const path = d3.geoPath()
      .projection(projection);

    //create SVG
    const svg = d3.select(this.refs.anchor)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background', '#a6d0ef')
      .style('border-style', 'solid')
      .style('border-color', 'grey');

    //create container for all pannable/zoomable elements
    const map = svg.append('g');

    svg.call(zoom)

    //invisible rect for dragging on whitespace
    map.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', w)
      .attr('height', h)
      .attr('opacity', 0)

    //bind data and create one path per json feature (state)
    map.selectAll('path')
      .data(this.state.data.map.features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', 'beige')
      .style('stroke', 'grey')

    //define travel line
    const line = d3.line()
      .x(d => projection([d.longitude, d.latitude])[0])
      .y(d => projection([d.longitude, d.latitude])[1])
      .curve(d3.curveCardinal.tension(0.4));

    //draw line
    map.append('path')
      .datum(photos)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    //bubbles for visited cities
    map.selectAll('circle')
      .data(photos)
      .enter()
      .append('circle')
      .attr('cx', d => projection([d.longitude, d.latitude])[0])
      .attr('cy', d => projection([d.longitude, d.latitude])[1])
      .attr('r', 4)
      .attr('class', d => d.city)
      .attr('fill', 'black')
      .on('mouseover', MapUtils.bubbleMouseOver)
      .on('mouseout', MapUtils.bubbleMouseOut);
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
          <p id="description">placeholder</p>
          {/* <p id="date">placeholder</p> */}
        </div>
      </>
    );
  }
}

export default withRouter(JourneyMap);
