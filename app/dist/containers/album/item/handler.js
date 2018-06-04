/* @flow */
import { compose, withStyle } from '~/core/container';
import { withProps, withState } from 'recompose';
import item from './item.scss';
import { replace } from 'ramda';

export default compose(
  withProps(({ src }) => ({ src: replace('http', 'https', src) })),
  withState('loaded', 'setLoaded', false),
  withStyle(item)
);
