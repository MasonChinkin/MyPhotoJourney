import React from 'react';
import { Link } from 'react-router-dom';

export default ({ journey }) => {
  return (
    <div>
      <Link to={`/journeys/${journey._id}`}>
        <span>{journey.name}</span>
      </Link>
      <i className="fa fa-clipboard" />
    </div>
  )
}