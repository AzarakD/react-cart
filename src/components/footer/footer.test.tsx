import { render, screen } from '@testing-library/react';

import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(<Footer />);

    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
});
