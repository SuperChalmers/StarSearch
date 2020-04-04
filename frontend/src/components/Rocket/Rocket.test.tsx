import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Rocket from './Rocket';

test('renders learn react link', () => {
  render(<Rocket direction="north"/>);
  
  expect(screen.findByText(/north/)).toBeInTheDocument()
});
