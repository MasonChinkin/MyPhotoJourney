import React, { Component } from 'react';
import * as d3 from 'd3';

class JourneyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      map: null
    }
  }

  componentWillMount() {
    d3.json('../../util/journey_map/map_test_data.json', (dataError, photos) => {
      if (dataError) throw dataError;
      d3.json('../../util/journey_map/world.json', (mapError, map) => {
        if (mapError) throw mapError;
        debugger
        this.setState({ photos, map });
      });
    });
  }

  render() {
    if (this.state.photos === null) return null;
    const photos = this.state.photos.map(photo => <p>{photo.memory}</p>)
    return (
      <div>
        {photos}
      </div >
    );
  }
}

export default JourneyMap;
