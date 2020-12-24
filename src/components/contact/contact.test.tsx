import { render } from '@testing-library/react';

import Contact from '.';

test('renders correctly', () => {
  const { asFragment } = render(<Contact />);
  expect(asFragment()).toMatchSnapshot();
});
