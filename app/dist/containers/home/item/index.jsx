/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import handler from './handler';

export default handler(({ id, src, setLoaded, loaded }) => (
  <Link styleName={`album-box ${loaded ? 'in' : ''}`} to={`album/${id}`}>
    <div styleName="album-box-img" className="z-depth-3">
      <img src={src} onLoad={setLoaded} />
    </div>
    <div styleName="album-box-bg" className="z-depth-3" />
  </Link>
));
