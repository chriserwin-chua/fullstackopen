import React, { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = forwardRef(function BlogForm(props, ref) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const handleNewBlog = (e) => {
    e.preventDefault();
    try {
      dispatch(createBlog({ title, author, url }));
      dispatch(setNotification(`you have created ${title}`, 5, 'success'));
      ref.current.toggleVisibility();

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (e) {
      if (e.response.status === 400) {
        dispatch(setNotification(e.response.data, 5, 'error'));
      }
    }
  };
  return (
    <form onSubmit={handleNewBlog} className="border-2 border-black rounded-xl p-4 mb-4">
      <h2 className="text-2xl mb-2">Create New Blog</h2>
      <div className="flex mb-2">
        <label className="w-16">Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="enter title"
          className="border-2 rounded-md px-2 border-gray-400"
        />
      </div>
      <div className="flex mb-2">
        <label className="w-16">Author:</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="enter author"
          className="border-2 rounded-md px-2 border-gray-400"
        />
      </div>
      <div className="flex mb-2">
        <label className="w-16">Url:</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="enter url"
          className="border-2 rounded-md px-2 border-gray-400"
        />
      </div>
      <div>
        <button type="submit" className="border-2 border-black rounded-md px-2">
          Create
        </button>
      </div>
    </form>
  );
});

export default BlogForm;
