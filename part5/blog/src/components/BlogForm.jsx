import React, { useState } from 'react';

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = (e) => {
    e.preventDefault();
    createNewBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <form onSubmit={handleNewBlog}>
      <h2>create new blog</h2>
      <div>
        title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="enter title"
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="enter author"
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="enter url"
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default BlogForm;
