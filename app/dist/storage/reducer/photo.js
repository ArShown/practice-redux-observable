/* @flow */
import { reducerCreator, pickFromSchema } from '~/core/reducer';
import Photo from '../schema/photo';
import { map } from 'ramda';

/* store key */
export const STORE_KEY = 'photo';

/* action type */
export const SAVE_PHOTO = 'SAVE_PHOTO';
export const CLEAR_PHOTO = 'CLEAR_PHOTO';

/* default store */
const defaultStore: Array<Photo> = [];

const reducer = reducerCreator(defaultStore, {
  [SAVE_PHOTO]: (preState, payload: Array<Object>) =>
    map(pickFromSchema(Photo), payload),
  [CLEAR_PHOTO]: () => defaultStore
});

export default {
  [STORE_KEY]: reducer
};
