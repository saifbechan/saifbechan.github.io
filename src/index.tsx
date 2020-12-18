import { render } from 'react-dom';

import './index.scss';
import Rocketeers from './Rocketeers';
import * as serviceWorker from './serviceWorker';

render(<Rocketeers rockets={500} />, document.getElementById('root'));

serviceWorker.unregister();
