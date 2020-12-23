import { render } from '@testing-library/react';

import RocketeerApp from './RocketeerApp';

test('renders a p5 sketch canvas without crashing', () => {
  const { asFragment } = render(
    <RocketeerApp lifespan={100} rocketeers={20} />
  );
  expect(asFragment()).toMatchSnapshot();
});
