import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from './TodoForm';

describe('TodoForm Component', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    mockAddTodo.mockClear();
    render(<TodoForm addTodo={mockAddTodo} />);
  });

  test('renders form with all elements', () => {
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByTitle('Add todo')).toBeInTheDocument();
    expect(screen.getByText('Priority:')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  test('has medium priority selected by default', () => {
    const mediumButton = screen.getByText('Medium').closest('button');
    expect(mediumButton).toHaveClass('active');
  });

  test('submits form with correct data', async () => {
    const input = screen.getByPlaceholderText('What needs to be done?');
    const submitButton = screen.getByTitle('Add todo');
    
    // Type todo text
    await userEvent.type(input, 'Test Todo');
    
    // Select high priority
    const highButton = screen.getByText('High').closest('button');
    await userEvent.click(highButton);
    expect(highButton).toHaveClass('active');
    
    // Submit form
    await userEvent.click(submitButton);
    
    // Check if addTodo was called with correct data
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith('Test Todo', 'high');
  });

  test('submits form on Enter key press', async () => {
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    // Type and press Enter
    await userEvent.type(input, 'Test Todo{enter}');
    
    // Check if addTodo was called
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith('Test Todo', 'medium');
  });

  test('does not submit empty todo', async () => {
    const submitButton = screen.getByTitle('Add todo');
    
    // Submit with empty input
    await userEvent.click(submitButton);
    
    // Should not call addTodo
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test('clears input after submission', async () => {
    const input = screen.getByPlaceholderText('What needs to be done?');
    const submitButton = screen.getByTitle('Add todo');
    
    // Submit a todo
    await userEvent.type(input, 'Test Todo');
    await userEvent.click(submitButton);
    
    // Input should be cleared
    expect(input.value).toBe('');
  });

  test('resets priority to medium after submission', async () => {
    const input = screen.getByPlaceholderText('What needs to be done?');
    const submitButton = screen.getByTitle('Add todo');
    const highButton = screen.getByText('High').closest('button');
    const mediumButton = screen.getByText('Medium').closest('button');
    
    // Select high priority
    await userEvent.click(highButton);
    expect(highButton).toHaveClass('active');
    
    // Submit form
    await userEvent.type(input, 'Test Todo');
    await userEvent.click(submitButton);
    
    // Priority should reset to medium
    expect(mediumButton).toHaveClass('active');
  });

  test('all priority buttons work correctly', async () => {
    const highButton = screen.getByText('High').closest('button');
    const mediumButton = screen.getByText('Medium').closest('button');
    const lowButton = screen.getByText('Low').closest('button');
    
    // Check initial state
    expect(mediumButton).toHaveClass('active');
    expect(highButton).not.toHaveClass('active');
    expect(lowButton).not.toHaveClass('active');
    
    // Click high priority
    await userEvent.click(highButton);
    expect(highButton).toHaveClass('active');
    expect(mediumButton).not.toHaveClass('active');
    expect(lowButton).not.toHaveClass('active');
    
    // Click low priority
    await userEvent.click(lowButton);
    expect(lowButton).toHaveClass('active');
    expect(highButton).not.toHaveClass('active');
    expect(mediumButton).not.toHaveClass('active');
    
    // Click medium priority again
    await userEvent.click(mediumButton);
    expect(mediumButton).toHaveClass('active');
    expect(highButton).not.toHaveClass('active');
    expect(lowButton).not.toHaveClass('active');
  });

  test('input has autoFocus attribute', () => {
    const input = screen.getByPlaceholderText('What needs to be done?');
    expect(input).toHaveAttribute('autoFocus');
  });
});