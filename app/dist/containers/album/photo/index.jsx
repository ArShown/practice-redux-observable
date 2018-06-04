/* @flow */
import React from 'react';
import handler from './handler';
import Item from '../item';
import { map } from 'ramda';

export default handler(({ storeData: photo }) => (
  <div className="row">
    {map(
      item => (
        <div key={`user-${item.id}`} className="col s12 m4 l3">
          <Item src={item.thumbnailUrl} />
        </div>
      ),
      photo
    )}
  </div>
));
