import { render, screen, waitFor } from '@testing-library/react';

import Rocketeers from './index';

test('renders correctly', async () => {
  render(<Rocketeers />);
  await waitFor(() => screen.getByTestId('rocketeers'));
  expect(screen.getByTestId('rocketeers')).toBeInTheDocument();
});
