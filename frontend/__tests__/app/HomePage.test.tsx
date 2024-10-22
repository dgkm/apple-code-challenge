import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders HomePage', () => {
    render(<HomePage />);

    const content = screen.getByTestId('page-section');

    expect(content).toBeInTheDocument();
  });
});
