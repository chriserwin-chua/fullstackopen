import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('clicking the view shows more details', async () => {
  const mockCreateNewBlog = vi.fn();

  render(<BlogForm createNewBlog={mockCreateNewBlog} />);
  const user = userEvent.setup();
  const titleInput = screen.getByPlaceholderText('enter title');
  const authorInput = screen.getByPlaceholderText('enter author');
  const urlInput = screen.getByPlaceholderText('enter url');

  userEvent.type(titleInput, 'test title');
  userEvent.type(authorInput, 'test author');
  userEvent.type(urlInput, 'random url');

  const createButton = screen.getByText('create');
  await user.click(createButton);
  expect(mockCreateNewBlog.mock.calls).toHaveLength(1);
});
