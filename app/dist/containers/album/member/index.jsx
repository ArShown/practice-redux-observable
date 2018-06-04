/* @flow */
import React from 'react';
import handler from './handler';

export default handler(({ storeData: { name, email } }) => (
  <small className="red-text text-accent-1">
    {name} <small>{`<${email}>`}</small>
  </small>
));
