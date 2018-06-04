/* @flow */
/* constant */
import { SAVE_PHOTO, CLEAR_PHOTO } from '~/storage/reducer/photo';
/* action */
import { emit } from '~/core/action/effects';
/* helper */
import { empty } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { is } from 'ramda';

/* epic type */
export const FETCH_ONE_BY_ALBUM_ID = 'PHOTO_FETCH_ONE_BY_ALBUM_ID';
export const FETCH_SUCCESS = 'PHOTO_FETCH_SUCCESS';
export const FETCH_FAILED = 'PHOTO_FETCH_FAILED';
export const CLEAR_STORE = 'PHOTO_CLEAR_STORE';

export const fetchListByAlbumId = (action$: any) =>
  action$.ofType(FETCH_ONE_BY_ALBUM_ID).pipe(
    switchMap(action => {
      const {
        albumId,
        successCallback = res => emit(FETCH_SUCCESS, res),
        failedCallback = err => emit(FETCH_FAILED, err)
      } = action.payload;

      return ajax
        .getJSON(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
        )
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
          SAVE_PHOTO,
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
  action$.ofType(CLEAR_STORE).pipe(mapTo(emit(CLEAR_PHOTO)));

/* export epic */
export const epics = [
  fetchListByAlbumId,
  saveToStore,
  errorEmitter,
  clearStore
];
