import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlog } from '../reducers/blogReducer';
import Togglable from '../components/common/Togglable';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';
const BlogPage = () => {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => [...state.blogs].sort((a, b) => b.likes - a.likes));
  //const user = useSelector((state) => state.user);

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
