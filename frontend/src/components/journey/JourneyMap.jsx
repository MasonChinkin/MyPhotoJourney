import React, { Component } from 'react';
import * as d3 from 'd3';

class JourneyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentWillMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    });

    fetch("http://localhost:5000/journey", {
      headers: myHeaders,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  }

  componentDidUpdate() {
    /* jshint asi: true, esversion: 6, unused: true, -W008, -W069, -W030 */
    //asi=semicolon, esversion=const, W008=leading decimal, W069=ex. d['year'] instead of d.year, W030= jshint expects assignment/function from ex. margin.bottom

    //Width and height
    const w = 1200
    const h = 600
    // const active = d3.select(null)

    //define projection
    const projection = d3.geoEquirectangular()
      .scale(900)
      .translate([250, 975])

    //chloropleth from COLORBREWER
    //const colors = d3.scaleOrdinal(d3.schemeCategory20)

    //define drag behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', d => {
        map.style('stroke-width', 1 / d3.event.transform.k + 'px')
        map.attr('transform', d3.event.transform)
      })

    // define path
    const path = d3.geoPath()
      .projection(projection)

    //create SVG
    const svg = d3.select(this.refs.anchor)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background', '#a6d0ef')
      .style('border-style', 'solid')
      .style('border-color', 'grey')

    //create container for all pannable/zoomable elements
    const map = svg.append('g')

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
      .x(d => projection([d.lon, d.lat])[0])
      .y(d => projection([d.lon, d.lat])[1])
      .curve(d3.curveCardinal.tension(0.4))

    //draw line
    map.append('path')
      .datum(this.state.data.photos)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 1.5)
      .attr('d', line)

    //bubbles for visited cities
    map.selectAll('circle')
      .data(this.state.data.photos)
      .enter()
      .append('circle')
      .attr('cx', d => projection([d.lon, d.lat])[0])
      .attr('cy', d => projection([d.lon, d.lat])[1])
      .attr('r', 4)
      .attr('fill', 'black')
  }

  render() {
    const { data } = this.state;
    if (data === null) return null;
    // const photos = this.state.data.photos.map(photo => <p>{photo.memory}</p>)
    return <div ref="anchor" />;
  }
}

export default JourneyMap;
