/* @flow */
import React from 'react';
import handler from './handler';

export default handler(({ src, setLoaded, loaded }) => (
  <div styleName={`photo-box ${loaded ? 'in' : ''}`}>
    <div styleName="photo-box-img" className="z-depth-3">
      <img src={src} onLoad={setLoaded} />
    </div>
  </div>
));
