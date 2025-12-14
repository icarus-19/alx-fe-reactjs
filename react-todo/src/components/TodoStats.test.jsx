import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoStats from './TodoStats';

describe('TodoStats Component', () => {
  const mockTodos = [
    { id: 1, text: 'Todo 1', completed: true, priority: 'high' },
    { id: 2, text: 'Todo 2', completed: false, priority: 'medium' },
    { id: 3, text: 'Todo 3', completed: false, priority: 'low' },
    { id: 4, text: 'Todo 4', completed: false, priority: 'high' },
  ];

  const mockClearCompleted = jest.fn();

  beforeEach(() => {
    mockClearCompleted.mockClear();
  });

  test('renders statistics with correct values', () => {
    render(<TodoStats todos={mockTodos} clearCompleted={mockClearCompleted} />);

    // Total tasks
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();

    // Active tasks (3 not completed)
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();

    // Completed tasks (1 completed)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('calculates and displays correct progress percentage', () => {
    render(<TodoStats todos={mockTodos} clearCompleted={mockClearCompleted} />);

    // 1 out of 4 completed = 25%
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('shows priority distribution', () => {
    render(<TodoStats todos={mockTodos} clearCompleted={mockClearCompleted} />);

    expect(screen.getByText('Priority Distribution')).toBeInTheDocument();
    
    // High: 2 todos
    expect(screen.getByText('high')).toBeInTheDocument();
    
    // Medium: 1 todo
    expect(screen.getByText('medium')).toBeInTheDocument();
    
    // Low: 1 todo
    expect(screen.getByText('low')).toBeInTheDocument();
  });

  test('clear button is enabled when there are completed todos', () => {
    render(<TodoStats todos={mockTodos} clearCompleted={mockClearCompleted} />);

    const clearButton = screen.getByText(/Clear Completed/);
    expect(clearButton).toBeEnabled();
    expect(clearButton).toHaveTextContent('Clear Completed (1)');
  });

  test('clear button is disabled when no completed todos', () => {
    const todosNoCompleted = mockTodos.map(todo => ({ ...todo, completed: false }));
    
    render(<TodoStats todos={todosNoCompleted} clearCompleted={mockClearCompleted} />);

    const clearButton = screen.getByText(/Clear Completed/);
    expect(clearButton).toBeDisabled();
    expect(clearButton).toHaveTextContent('Clear Completed (0)');
  });

  test('calls clearCompleted when clear button is clicked', async () => {
    render(<TodoStats todos={mockTodos} clearCompleted={mockClearCompleted} />);

    const clearButton = screen.getByText(/Clear Completed/);
    await userEvent.click(clearButton);

    expect(mockClearCompleted).toHaveBeenCalledTimes(1);
  });

  test('displays progress bar with correct width', () => {
    render(<TodoStats todos={mockTodos} clearCompleted={mockClearCompleted} />);

    const progressFill = screen.getByText('25%').closest('.progress-container').querySelector('.progress-fill');
    expect(progressFill).toHaveStyle('width: 25%');
  });

  test('handles empty todo list', () => {
    render(<TodoStats todos={[]} clearCompleted={mockClearCompleted} />);

    expect(screen.getByText('0')).toBeInTheDocument(); // Total tasks
    expect(screen.getByText('0')).toBeInTheDocument(); // Active tasks
    expect(screen.getByText('0')).toBeInTheDocument(); // Completed tasks
    expect(screen.getByText('0%')).toBeInTheDocument(); // Progress
  });
});