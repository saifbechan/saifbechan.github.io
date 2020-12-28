import { render } from 'react-dom';

import './index.scss';
import App from './app';

render(
  <App lifespan={600} rocketeers={100} />,
  document.getElementById('root')
);
