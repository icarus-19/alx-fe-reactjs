import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Todo App Integration Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('full todo lifecycle: add, complete, edit, delete', async () => {
    // Step 1: Add a new todo
    const todoInput = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByTitle('Add todo');
    
    await userEvent.type(todoInput, 'Integration Test Todo');
    await userEvent.click(screen.getByText('High'));
    await userEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Integration Test Todo')).toBeInTheDocument();
    });
    
    // Total should now be 5
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // Step 2: Complete the todo
    const newTodoCheckbox = screen.getByLabelText('Integration Test Todo');
    await userEvent.click(newTodoCheckbox);
    
    // Step 3: Filter to see only completed
    const completedFilter = screen.getByText('Completed').closest('button');
    await userEvent.click(completedFilter);
    
    await waitFor(() => {
      expect(screen.getByText('Integration Test Todo')).toBeInTheDocument();
      expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    });
    
    // Step 4: Edit the todo
    const editButton = screen.getByTitle('Edit todo');
    await userEvent.click(editButton);
    
    const editInput = screen.getByDisplayValue('Integration Test Todo');
    await userEvent.clear(editInput);
    await userEvent.type(editInput, 'Updated Integration Test Todo');
    
    const saveButton = screen.getByTitle('Save');
    await userEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText('Updated Integration Test Todo')).toBeInTheDocument();
    });
    
    // Step 5: Delete the todo
    const deleteButton = screen.getByTitle('Delete todo');
    await userEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Updated Integration Test Todo')).not.toBeInTheDocument();
    });
    
    // Total should be back to 4
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('filtering and statistics update together', async () => {
    // Initial stats
    expect(screen.getByText('4')).toBeInTheDocument(); // Total
    expect(screen.getByText('3')).toBeInTheDocument(); // Active
    expect(screen.getByText('1')).toBeInTheDocument(); // Completed
    
    // Complete a todo
    const todoCheckbox = screen.getByLabelText('Build a Todo App');
    await userEvent.click(todoCheckbox);
    
    // Stats should update
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // Completed
      expect(screen.getByText('2')).toBeInTheDocument(); // Active
    });
    
    // Filter to active
    const activeFilter = screen.getByText('Active').closest('button');
    await userEvent.click(activeFilter);
    
    // Should only show active todos
    await waitFor(() => {
      expect(screen.getByText('Write tests')).toBeInTheDocument();
      expect(screen.getByText('Deploy to production')).toBeInTheDocument();
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    });
  });

  test('clear completed updates both list and statistics', async () => {
    // Initially has 1 completed todo
    const clearButton = screen.getByText(/Clear Completed/);
    expect(clearButton).toBeEnabled();
    expect(clearButton).toHaveTextContent('Clear Completed (1)');
    
    // Clear completed
    await userEvent.click(clearButton);
    
    // Completed todo should be removed
    await waitFor(() => {
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });
    
    // Clear button should be disabled
    expect(clearButton).toBeDisabled();
    expect(clearButton).toHaveTextContent('Clear Completed (0)');
    
    // Stats should update
    expect(screen.getByText('3')).toBeInTheDocument(); // Total
    expect(screen.getByText('3')).toBeInTheDocument(); // Active
    expect(screen.getByText('0')).toBeInTheDocument(); // Completed
  });
});