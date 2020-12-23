import { render } from 'react-dom';

import './index.scss';
import RocketeerApp from './RocketeerApp';

render(
  <RocketeerApp lifespan={1000} rocketeers={100} />,
  document.getElementById('root')
);
