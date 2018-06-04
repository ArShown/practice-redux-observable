/* @flow */
import React from 'react';
import handler from './handler';
/* components */
import { Link } from 'react-router-dom';
import Title from './title';
import Member from './member';
import Photo from './photo';

export default handler(() => (
  <div>
    <Title />
    <div className="divider" />
    <div>
      <h6 className="left">
        <Link to="/home">{`< go back`}</Link>
      </h6>
      <h6 className="right blue-grey-text text-lighten-1">
        Power by <Member />
      </h6>
    </div>
    <div styleName="body">
      <Photo />
    </div>
  </div>
));
