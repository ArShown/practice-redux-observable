/* @flow */
/* constant */
import { APPEND_ALBUM, CLEAR_ALBUM } from '~/storage/reducer/album';
/* action */
import { emit } from '~/core/action/effects';
/* helper */
import { empty } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { is } from 'ramda';

/* epic type */
export const FETCH_LIST_BY_USER_ID = 'FETCH_LIST_BY_USER_ID';
export const FETCH_ONE_BY_ID = 'FETCH_ONE_BY_ID';
export const CLEAR_STORE = 'CLEAR_STORE';

export const fetchListByUserId = (action$: any) =>
  action$.ofType(FETCH_LIST_BY_USER_ID).pipe(
    switchMap(action => {
      const {
        userId,
        successCallback = saveToStore,
        failedCallback = errorEmitter
      } = action.payload;

      return ajax
        .getJSON(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .pipe(
          map(successCallback),
          catchError(failedCallback)
        );
    })
  );

export const fetchOneById = (action$: any) =>
  action$.ofType(FETCH_ONE_BY_ID).pipe(
    switchMap(action => {
      const {
        id,
        successCallback = saveToStore,
        failedCallback = errorEmitter
      } = action.payload;

      return ajax
        .getJSON(`https://jsonplaceholder.typicode.com/albums/${id}`)
        .pipe(
          map(successCallback),
          catchError(failedCallback)
        );
    })
  );

/* save */
export const saveToStore = (res: Array<Object> | Object) =>
  emit(APPEND_ALBUM, is(Array, res) ? res : [res]);

/* error */
export const errorEmitter = (err: Array<Object>) => {
  console.log(err);
  return empty();
};

/* clear */
export const clearStore = (action$: any) =>
  action$.ofType(CLEAR_STORE).pipe(mapTo(emit(CLEAR_ALBUM)));

/* export epic */
export const epics = [fetchListByUserId, fetchOneById, clearStore];
