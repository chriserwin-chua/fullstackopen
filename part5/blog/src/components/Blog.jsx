import { useState } from 'react';

const Blog = ({ blog, updateBlog, isBlogPoster, deleteBlog }) => {
  const [isViewed, setIsViewed] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}
      </span>
      <button onClick={() => setIsViewed(!isViewed)}>
        {isViewed ? 'Hide' : 'View'}
      </button>
      {isViewed && (
        <>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </p>
          <p>{blog.author}</p>
          {isBlogPoster && (
            <button onClick={() => deleteBlog(blog.id, blog.title)}>
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default Blog;
