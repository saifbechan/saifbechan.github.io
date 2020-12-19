import { render } from 'react-dom';

import './index.scss';
import Rocketeers from './Rocketeers';
import * as serviceWorker from './serviceWorker';

render(<Rocketeers rocketeers={25} />, document.getElementById('root'));

serviceWorker.unregister();
