import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock axios to prevent actual API calls
jest.mock('axios');

describe('App', () => {
  test('renders main application', () => {
    render(<App />);
    
    // Check that the main components are rendered
    expect(screen.getByPlaceholderText(/search by venue name/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument(); // Logo
  });

  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
