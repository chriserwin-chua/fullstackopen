import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogView = () => {
  const { id } = useParams();
  const [inputComment, setInputComment] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blog = useSelector((state) => [...state.blogs].find((blog) => blog.id === id));
  const user = useSelector((state) => state.user);
  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog));
      dispatch(setNotification(`you have liked ${blog.title}`, 5, 'success'));
    } catch (e) {
      if (e.response.status === 400) {
        dispatch(setNotification(e.response.data, 5, 'error'));
      }
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure want to delete ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(setNotification(`you have deleted ${blog.title}`, 5, 'success'));
        navigate('/');
      } catch (e) {
        if (e.response.status === 400) {
          dispatch(setNotification(e.response.data, 5, 'error'));
        }
      }
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    //setComments([...comments, inputComment]);
    try {
      dispatch(commentBlog(blog, inputComment));
      dispatch(setNotification(`comment added`, 5, 'success'));
      setInputComment('');
    } catch (e) {
      if (e.response.status === 400) {
        dispatch(setNotification(e.response.data, 5, 'error'));
      }
    }
  };

  const isBlogPoster = blog && user && blog.user && blog.user.username === user?.username;
  if (!id || !blog) {
    return <h1>Blog not found.</h1>;
  }
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl">{blog.title}</h1>
      <a href={blog.url} className="hover:underline hover:text-blue-500">
        {blog.url}
      </a>
      <p>
        Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button>
      </p>
      <p>Added by {blog.author}</p>
      {isBlogPoster && <button onClick={() => handleDelete(blog)}>delete</button>}

      <p>
        <input
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
          placeholder="input comment"
          className="border-2 rounded-md px-2 border-gray-400"
        />
        <button onClick={handleComment} className="border-2 border-black rounded-md px-2 ml-2">
          add comment
        </button>
      </p>
      <h4>comments</h4>
      {blog.comments && blog.comments.length > 0 ? (
        <ul className="pl-2 border-b-2">
          {blog.comments.map((comment, id) => (
            <li key={id}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No Comments.</p>
      )}
    </div>
  );
};

export default BlogView;
