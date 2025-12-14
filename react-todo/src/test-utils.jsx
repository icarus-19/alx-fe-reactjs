import React from 'react';
import { render } from '@testing-library/react';

// Custom render function with providers
const customRender = (ui, options = {}) => {
  return render(ui, { ...options });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };