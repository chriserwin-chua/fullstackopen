import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import userService from '../services/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../contexts/NotificationContext';
const BlogView = () => {
  const { id } = useParams();
  const [inputComment, setInputComment] = useState('');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem('token'));
    if (localStorageToken) {
      setUser(localStorageToken);
    }
  }, []);

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

  const queryClient = useQueryClient();

  const likeBlogMutation = useMutation({
    mutationFn: blogService.likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    }
  });
  const notifDispatch = useNotificationDispatch();
  const handleLike = (blog) => {
    likeBlogMutation.mutate(blog);
    notifDispatch({
      type: 'ADD_NOTIFICATION_TEXT',
      payload: `You have liked on ${blog.title}`
    });
  };
  const resultBlog = useQuery({
    queryKey: ['blog'],
    queryFn: blogService.getAll
  });

  if (resultBlog.isLoading) {
    return <div>loading data...</div>;
  }
  if (resultBlog.status === 'error') {
    return <div>Blog service currently not available.</div>;
  }
  const blogs = resultBlog.data;
  const blog = blogs && !resultBlog.isLoading && blogs.find((blog) => blog.id === id);
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
        Likes: {blog.likes}{' '}
        <button onClick={() => handleLike(blog)} className="border-2 border-black rounded-md px-2">
          Like
        </button>
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
