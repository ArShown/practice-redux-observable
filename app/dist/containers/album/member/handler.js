/* @flow */
import { STORE_KEY } from '~/storage/reducer/member';
import { compose, withStore } from '~/core/container';
import { branch, renderNothing } from 'recompose';

export default compose(
  withStore(STORE_KEY),
  branch(({ storeData }) => !storeData, renderNothing)
);
