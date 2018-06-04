/* @flow */
import { compose, withStyle } from '~/core/container';
import { branch, renderNothing, withPropsOnChange, withState } from 'recompose';
import item from './item.scss';
import { join } from 'ramda';

export default branch(
  ({ id }) => !id,
  renderNothing,
  compose(
    withPropsOnChange(['id'], () => {
      const _getColorCode = () => {
        const color = () => parseInt(Math.random() * 255 + 1).toString(16);
        return join('', [color(), color(), color()]);
      };

      return { src: 'https://placehold.it/150/' + _getColorCode() };
    }),
    withState('loaded', 'setLoaded', false),
    withStyle(item)
  )
);
