import { render, screen, waitFor } from '@testing-library/react';

import App from './app';

test('renders a p5 sketch canvas without crashing', async () => {
  render(<App lifespan={100} rocketeers={20} />);

  await waitFor(() => screen.getByTestId('app'));

  expect(screen.getByTestId('app')).not.toBeEmptyDOMElement('');
});
