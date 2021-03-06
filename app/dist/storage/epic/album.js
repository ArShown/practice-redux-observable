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
export const FETCH_LIST_BY_USER_ID = 'ALBUM_FETCH_LIST_BY_USER_ID';
export const FETCH_ONE_BY_ID = 'ALBUM_FETCH_ONE_BY_ID';
export const FETCH_SUCCESS = 'ALBUM_FETCH_SUCCESS';
export const FETCH_FAILED = 'ALBUM_FETCH_FAILED';
export const CLEAR_STORE = 'ALBUM_CLEAR_STORE';

export const fetchListByUserId = (action$: any) =>
  action$.ofType(FETCH_LIST_BY_USER_ID).pipe(
    switchMap(action => {
      const {
        userId,
        successCallback = res => emit(FETCH_SUCCESS, res),
        failedCallback = err => emit(FETCH_FAILED, err)
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
        successCallback = res => emit(FETCH_SUCCESS, res),
        failedCallback = err => emit(FETCH_FAILED, err)
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
export const saveToStore = (action$: any) =>
  action$
    .ofType(FETCH_SUCCESS)
    .pipe(
      map(action =>
        emit(
          APPEND_ALBUM,
          is(Array, action.payload) ? action.payload : [action.payload]
        )
      )
    );

/* error */
export const errorEmitter = (action$: any) =>
  action$.ofType(FETCH_FAILED).pipe(
    map(action => {
      console.log(action.payload);
      return empty();
    })
  );

/* clear */
export const clearStore = (action$: any) =>
  action$.ofType(CLEAR_STORE).pipe(mapTo(emit(CLEAR_ALBUM)));

/* export epic */
export const epics = [
  fetchListByUserId,
  fetchOneById,
  saveToStore,
  errorEmitter,
  clearStore
];
