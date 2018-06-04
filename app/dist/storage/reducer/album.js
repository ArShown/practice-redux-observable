/* @flow */
import { reducerCreator, pickFromSchema } from '~/core/reducer';
import Album from '../schema/album';
import { map, concat } from 'ramda';

/* store key */
export const STORE_KEY = 'album';

/* action type */
export const APPEND_ALBUM = 'APPEND_ALBUM';
export const CLEAR_ALBUM = 'CLEAR_ALBUM';

/* default store */
const defaultStore: Array<Album> = [];

const reducer = reducerCreator(defaultStore, {
  [APPEND_ALBUM]: (preState, payload: Array<Object>) =>
    concat(preState, map(pickFromSchema(Album), payload)),
  [CLEAR_ALBUM]: () => defaultStore
});

export default {
  [STORE_KEY]: reducer
};
