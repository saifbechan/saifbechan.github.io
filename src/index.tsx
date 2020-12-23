import { render } from 'react-dom';

import './index.scss';
import RocketeerApp from './RocketeerApp';
import * as serviceWorker from './serviceWorker';

render(
  <RocketeerApp lifespan={1000} rocketeers={100} />,
  document.getElementById('root')
);

serviceWorker.unregister();
