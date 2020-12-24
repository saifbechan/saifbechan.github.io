import { render } from '@testing-library/react';

import App from './app';

test('renders a p5 sketch canvas without crashing', () => {
  const { asFragment } = render(<App lifespan={100} rocketeers={20} />);
  expect(asFragment()).toMatchSnapshot();
});
