import { render } from 'react-dom';

import './index.scss';
import Rocketeers from './Rocketeers';
import * as serviceWorker from './serviceWorker';

render(
  <Rocketeers lifespan={600} rocketeers={100} />,
  document.getElementById('root')
);

serviceWorker.unregister();
