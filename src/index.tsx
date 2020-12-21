import { render } from 'react-dom';

import './index.scss';
import Rocketeers from './Rocketeers';
import * as serviceWorker from './serviceWorker';

render(
  <Rocketeers lifespan={1000} rocketeers={100} />,
  document.getElementById('root')
);

serviceWorker.unregister();
