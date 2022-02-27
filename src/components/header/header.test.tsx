import { render, screen } from '@testing-library/react';

import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(<Header />);

    expect(screen.getByText(/Main/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
