import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders the main application header', () => {
    expect(screen.getByText('📝 React Todo App')).toBeInTheDocument();
    expect(screen.getByText(/A simple yet powerful todo application built with React/i)).toBeInTheDocument();
  });

  test('displays initial todos', () => {
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Deploy to production')).toBeInTheDocument();
  });

  test('shows total task count', () => {
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument(); // Initial 4 todos
  });

  test('renders all feature list items', () => {
    const featuresList = screen.getByText('🚀 Features').parentElement;
    expect(featuresList).toBeInTheDocument();
    
    expect(screen.getByText('✅ Add todos with priority levels')).toBeInTheDocument();
    expect(screen.getByText('✅ Mark todos as complete/incomplete')).toBeInTheDocument();
    expect(screen.getByText('✅ Edit existing todos')).toBeInTheDocument();
    expect(screen.getByText('✅ Filter by status & priority')).toBeInTheDocument();
    expect(screen.getByText('✅ Delete individual todos')).toBeInTheDocument();
    expect(screen.getByText('✅ Clear all completed todos')).toBeInTheDocument();
    expect(screen.getByText('✅ Statistics and progress tracking')).toBeInTheDocument();
    expect(screen.getByText('✅ Responsive design')).toBeInTheDocument();
    expect(screen.getByText('✅ Local state management')).toBeInTheDocument();
  });

  test('renders statistics section', () => {
    expect(screen.getByText('📊 Quick Stats')).toBeInTheDocument();
    expect(screen.getByText('Progress Overview')).toBeInTheDocument();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('renders filter section', () => {
    expect(screen.getByText('Filter Tasks')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  test('renders footer with correct content', () => {
    expect(screen.getByText(/React Todo App &copy;/)).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const todoInput = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByTitle('Add todo');
    
    // Type new todo
    await userEvent.type(todoInput, 'New Test Todo');
    
    // Select high priority
    const highPriorityButton = screen.getByText('High');
    await userEvent.click(highPriorityButton);
    
    // Submit form
    await userEvent.click(addButton);
    
    // Check if new todo is added
    await waitFor(() => {
      expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    });
    
    // Check total count increased
    expect(screen.getByText('5')).toBeInTheDocument(); // Now 5 todos
  });

  test('toggles todo completion', async () => {
    const todoCheckbox = screen.getByLabelText('Build a Todo App').querySelector('input[type="checkbox"]');
    
    // Initially not checked
    expect(todoCheckbox).not.toBeChecked();
    
    // Click to complete
    await userEvent.click(todoCheckbox);
    
    // Now should be checked
    expect(todoCheckbox).toBeChecked();
    
    // Click again to uncomplete
    await userEvent.click(todoCheckbox);
    
    // Should be unchecked again
    expect(todoCheckbox).not.toBeChecked();
  });

  test('filters todos by status', async () => {
    // Check all filter initially active
    const allFilter = screen.getByText('All').closest('button');
    expect(allFilter).toHaveClass('active');
    
    // Click active filter
    const activeFilter = screen.getByText('Active').closest('button');
    await userEvent.click(activeFilter);
    
    // Should show only active todos
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Deploy to production')).toBeInTheDocument();
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument(); // This one is completed
    
    // Click completed filter
    const completedFilter = screen.getByText('Completed').closest('button');
    await userEvent.click(completedFilter);
    
    // Should show only completed todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
  });

  test('filters todos by priority', async () => {
    // Click high priority filter
    const highFilter = screen.getByText('High').closest('button');
    await userEvent.click(highFilter);
    
    // Should show only high priority todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Deploy to production')).toBeInTheDocument();
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument(); // Medium priority
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument(); // Low priority
  });

  test('clears completed todos', async () => {
    // Initially has one completed todo
    const clearButton = screen.getByText(/Clear Completed/);
    expect(clearButton).toBeEnabled();
    
    // Click clear completed
    await userEvent.click(clearButton);
    
    // Should remove completed todo
    await waitFor(() => {
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });
    
    // Clear button should now be disabled
    expect(clearButton).toBeDisabled();
  });

  test('deletes a todo', async () => {
    const todoItem = screen.getByText('Write tests').closest('.todo-item');
    const deleteButton = within(todoItem).getByTitle('Delete todo');
    
    // Delete the todo
    await userEvent.click(deleteButton);
    
    // Should be removed
    await waitFor(() => {
      expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
    });
    
    // Total count should decrease
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('edits a todo', async () => {
    const todoItem = screen.getByText('Build a Todo App').closest('.todo-item');
    const editButton = within(todoItem).getByTitle('Edit todo');
    
    // Start editing
    await userEvent.click(editButton);
    
    // Find edit input
    const editInput = within(todoItem).getByDisplayValue('Build a Todo App');
    
    // Change text
    await userEvent.clear(editInput);
    await userEvent.type(editInput, 'Build an Amazing Todo App');
    
    // Find and click save button
    const saveButton = within(todoItem).getByTitle('Save');
    await userEvent.click(saveButton);
    
    // Should show updated text
    await waitFor(() => {
      expect(screen.getByText('Build an Amazing Todo App')).toBeInTheDocument();
    });
  });
});