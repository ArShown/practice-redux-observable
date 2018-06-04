/* @flow */
/* constant */
import { SAVE_MEMBER, CLEAR_MEMBER } from '~/storage/reducer/member';
/* action */
import { emit } from '~/core/action/effects';
/* helper */
import { empty } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/* epic type */
export const FETCH_ONE_BY_ID = 'MEMBER_FETCH_ONE_BY_ID';
export const FETCH_SUCCESS = 'MEMBER_FETCH_SUCCESS';
export const FETCH_FAILED = 'MEMBER_FETCH_FAILED';
export const CLEAR_STORE = 'MEMBER_CLEAR_STORE';

export const fetchOneById = (action$: any) =>
  action$.ofType(FETCH_ONE_BY_ID).pipe(
    switchMap(action => {
      const {
        id,
        successCallback = res => emit(FETCH_SUCCESS, res),
        failedCallback = err => emit(FETCH_FAILED, err)
      } = action.payload;

      return ajax
        .getJSON(`https://jsonplaceholder.typicode.com/users/${id}`)
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
    .pipe(map(action => emit(SAVE_MEMBER, action.payload)));

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
  action$.ofType(CLEAR_STORE).pipe(mapTo(emit(CLEAR_MEMBER)));

/* export epic */
export const epics = [fetchOneById, saveToStore, errorEmitter, clearStore];
