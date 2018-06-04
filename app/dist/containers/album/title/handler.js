/* @flow */
import { STORE_KEY } from '~/storage/reducer/album';
import { compose, withStore } from '~/core/container';
import { branch, renderNothing } from 'recompose';

export default compose(
  withStore(`${STORE_KEY}.0.title`),
  branch(({ storeData }) => !storeData, renderNothing)
);
