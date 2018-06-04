/* @flow */
import { FETCH_LIST_BY_USER_ID, CLEAR_STORE } from '~/storage/epic/album';
import { emit } from '~/core/action/effects';
import { compose, withDispatch, withStyle } from '~/core/container';
import { lifecycle, withState, withHandlers } from 'recompose';
import home from './home.scss';

export default compose(
  withDispatch,
  withState('activePage', 'setActivePage', 0),
  withHandlers({
    fetchPage: ({ dispatch, setActivePage, activePage }) => () => {
      if (activePage === 10) return false;
      setActivePage(activePage + 1);
      dispatch(emit(FETCH_LIST_BY_USER_ID, { userId: activePage + 1 }));
    }
  }),
  lifecycle({
    componentDidMount() {
      /* 用 userId 模擬分頁加載 */
      this.props.fetchPage();
    },
    componentWillUnmount() {
      this.props.dispatch(emit(CLEAR_STORE));
    }
  }),
  withStyle(home)
);
