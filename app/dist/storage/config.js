/* reducer */
import reducerAlbum from './reducer/album';

/* epic */
import { epics as epicAlbum } from './epic/album';

export default {
  reducer: [reducerAlbum],
  epic: [...epicAlbum]
};
