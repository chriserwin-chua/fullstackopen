import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Mock Blog Title',
    author: 'Mock Author',
  };
  const mockUpdateBlog = vi.fn();
  const mockDeleteBlog = vi.fn();
  render(
    <Blog
      blog={blog}
      isBlogPoster={true}
      updateBlog={mockUpdateBlog}
      deleteBlog={mockDeleteBlog}
    />
  );

  const element = screen.getByText('Mock Blog Title', { exact: false });
  expect(element).toBeDefined();
});

test('clicking the view shows more details', async () => {
  const blog = {
    title: 'Mock Blog Title',
    author: 'Mock Author',
    url: 'http://test.com',
    likes: 5,
  };

  const mockUpdateBlog = vi.fn();
  const mockDeleteBlog = vi.fn();

  render(
    <Blog
      blog={blog}
      isBlogPoster={true}
      updateBlog={mockUpdateBlog}
      deleteBlog={mockDeleteBlog}
    />
  );
  const user = userEvent.setup();
  const viewButton = screen.getByText('View');
  await user.click(viewButton);
  const urlElement = screen.getByText('http://test.com');
  const likeElement = screen.getByText('Likes: 5');
  expect(urlElement).toBeDefined();
  expect(likeElement).toBeDefined();

  const likeButton = screen.getByText('Like');
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockUpdateBlog.mock.calls).toHaveLength(2);
});
