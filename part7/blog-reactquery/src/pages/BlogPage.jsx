import React, { useRef } from 'react';
import Togglable from '../components/common/Togglable';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';
import blogService from '../services/blogs';
import { useQuery } from '@tanstack/react-query';
const BlogPage = () => {
  const blogFormRef = useRef();

  const result = useQuery({
    queryKey: ['blog'],
    queryFn: blogService.getAll
  });

  const blogs = result.data;
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  return (
    <>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
      <div data-testid="blogList">
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
      </div>
    </>
  );
};

export default BlogPage;
