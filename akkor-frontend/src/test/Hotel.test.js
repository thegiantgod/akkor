import { render, screen } from '@testing-library/react';
import Hotel from '../components/hotel';

test("Renders hotel page", () => {
    render(<Hotel/>)
    const title = screen.getByText(/Hotel/i);
    expect(title).toBeInTheDocument();
})

