/* @flow */
import React from 'react';
import handler from './handler';

export default handler(({ children }) => (
  <div>
    <h1 styleName="header">ALBUM</h1>
    <div className="container">{children}</div>
  </div>
));
