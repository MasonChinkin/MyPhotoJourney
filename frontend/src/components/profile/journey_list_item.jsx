import React from 'react';
import {Link} from 'react-router-dom';

export default ({journey}) => {
  return (
    <div>
      <Link to={journey.url}>
        <span>{journey.name}</span>
        <span>{journey.description}</span>
      </Link>
      <i className="fa fa-clipboard fa-2x" aria-hidden="true"></i>
    </div>
  )
}