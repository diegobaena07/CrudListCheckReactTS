import React from 'react';
import { render, screen } from '@testing-library/react';
import Inicio from './ActividadDiaria/Inicio';

test('renders learn react link', () => {
  render(<Inicio />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
