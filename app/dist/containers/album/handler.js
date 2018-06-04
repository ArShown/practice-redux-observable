/* @flow */
import {
  FETCH_ONE_BY_ID as ALBUM_FETCH,
  CLEAR_STORE as CLEAR_ALBUM,
  FETCH_SUCCESS
} from '~/storage/epic/album';
import {
  FETCH_ONE_BY_ID as MEMBER_FETCH,
  CLEAR_STORE as CLEAR_MEMBER
} from '~/storage/epic/member';
import {
  FETCH_ONE_BY_ALBUM_ID as PHOTO_FETCH,
  CLEAR_STORE as CLEAR_PHOTO
} from '~/storage/epic/photo';
import { emit } from '~/core/action/effects';
import { compose, withDispatch, withStyle } from '~/core/container';
import { lifecycle } from 'recompose';
import album from './album.scss';

export default compose(
  withDispatch,
  lifecycle({
    componentDidMount() {
      const albumId = this.props.match.params.id;
      const { dispatch } = this.props;
      dispatch(
        emit(ALBUM_FETCH, {
          id: albumId,
          successCallback: response => {
            const { userId } = response;
            return [
              emit(FETCH_SUCCESS, response),
              emit(MEMBER_FETCH, { id: userId }),
              emit(PHOTO_FETCH, { albumId })
            ];
          }
        })
      );
    },
    componentWillUnmount() {
      this.props.dispatch([
        emit(CLEAR_ALBUM),
        emit(CLEAR_MEMBER),
        emit(CLEAR_PHOTO)
      ]);
    }
  }),
  withStyle(album)
);
