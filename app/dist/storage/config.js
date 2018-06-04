/* reducer */
import reducerAlbum from './reducer/album';
import reducerMember from './reducer/member';
import reducerPhoto from './reducer/photo';

/* epic */
import { epics as epicAlbum } from './epic/album';
import { epics as epicMember } from './epic/member';
import { epics as epicPhoto } from './epic/photo';

export default {
  reducer: [reducerAlbum, reducerMember, reducerPhoto],
  epic: [...epicAlbum, ...epicMember, ...epicPhoto]
};
