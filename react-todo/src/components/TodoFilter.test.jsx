import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoFilter from './TodoFilter';

describe('TodoFilter Component', () => {
  const mockSetFilter = jest.fn();

  beforeEach(() => {
    mockSetFilter.mockClear();
  });

  test('renders all filter buttons', () => {
    render(<TodoFilter currentFilter="all" setFilter={mockSetFilter} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  test('highlights current active filter', () => {
    render(<TodoFilter currentFilter="active" setFilter={mockSetFilter} />);

    const activeFilter = screen.getByText('Active').closest('button');
    expect(activeFilter).toHaveClass('active');
  });

  test('calls setFilter with correct value when filter is clicked', async () => {
    render(<TodoFilter currentFilter="all" setFilter={mockSetFilter} />);

    const completedFilter = screen.getByText('Completed').closest('button');
    await userEvent.click(completedFilter);

    expect(mockSetFilter).toHaveBeenCalledTimes(1);
    expect(mockSetFilter).toHaveBeenCalledWith('completed');
  });

  test('renders filter header', () => {
    render(<TodoFilter currentFilter="all" setFilter={mockSetFilter} />);

    expect(screen.getByText('Filter Tasks')).toBeInTheDocument();
    expect(screen.getByText('Click to filter')).toBeInTheDocument();
  });

  test('renders correct icons for each filter', () => {
    render(<TodoFilter currentFilter="all" setFilter={mockSetFilter} />);

    expect(screen.getByText('📋')).toBeInTheDocument(); // All
    expect(screen.getByText('⚡')).toBeInTheDocument(); // Active
    expect(screen.getByText('✅')).toBeInTheDocument(); // Completed
    expect(screen.getByText('🔥')).toBeInTheDocument(); // High
    expect(screen.getByText('⚖️')).toBeInTheDocument(); // Medium
    expect(screen.getByText('😌')).toBeInTheDocument(); // Low
  });

  test('only one filter is active at a time', async () => {
    const { rerender } = render(<TodoFilter currentFilter="all" setFilter={mockSetFilter} />);

    // Initially "All" should be active
    const allFilter = screen.getByText('All').closest('button');
    const highFilter = screen.getByText('High').closest('button');
    
    expect(allFilter).toHaveClass('active');
    expect(highFilter).not.toHaveClass('active');

    // Re-render with different active filter
    rerender(<TodoFilter currentFilter="high" setFilter={mockSetFilter} />);

    expect(allFilter).not.toHaveClass('active');
    expect(highFilter).toHaveClass('active');
  });
});