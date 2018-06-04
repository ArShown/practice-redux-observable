/* @flow */
import { reducerCreator, pickFromSchema } from '~/core/reducer';
import Member from '../schema/member';

/* store key */
export const STORE_KEY = 'member';

/* action type */
export const SAVE_MEMBER = 'SAVE_MEMBER';
export const CLEAR_MEMBER = 'CLEAR_MEMBER';

/* default store */
const defaultStore: ?Member = null;

const reducer = reducerCreator(defaultStore, {
  [SAVE_MEMBER]: (preState, payload: Object) => pickFromSchema(Member)(payload),
  [CLEAR_MEMBER]: () => defaultStore
});

export default {
  [STORE_KEY]: reducer
};
