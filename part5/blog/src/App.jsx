import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginServer from './services/login';
import Login from './pages/Login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/common/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const getBlogs = () => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const result = await loginServer.loginUser({ username, password });

      localStorage.setItem('token', JSON.stringify(result));
      blogService.setToken(result.token);
      setUser(result);
    } catch (e) {
      if (e.response.status === 401) {
        setNotificationMessage('Invalid username or Password');
        setNotificationType('error');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    blogService.setToken('');
  };

  const createNewBlog = async ({ title, author, url }) => {
    try {
      const result = await blogService.create({ title, author, url });
      blogFormRef.current.toggleVisibility();
      setNotificationMessage(`${result.title} has been added to the blog.`);
      setNotificationType('success');
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (e) {
      if (e.response.status === 400) {
        setNotificationMessage(e.response.data);
        setNotificationType('error');
      }
    }
  };

  const updateBlog = async (updatedBlog) => {
    try {
      const result = await blogService.update(updatedBlog.id, updatedBlog);
      setNotificationMessage(`${result.title} has been liked.`);
      setNotificationType('success');
      getBlogs();
    } catch (e) {
      if (e.response.status === 400) {
        setNotificationMessage(e.response.data);
        setNotificationType('error');
      }
    }
  };

  const deleteBlog = async (id, title) => {
    try {
      if (window.confirm(`Are you sure want to delete ${title}?`)) {
        console.log('here');
        await blogService.deleteBlog(id);
        setNotificationMessage(`${title} has been deleted.`);
        setNotificationType('success');
        getBlogs();
      }
    } catch (e) {
      if (e.response.status === 400) {
        setNotificationMessage(e.response.data);
        setNotificationType('error');
      }
    }
  };
  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem('token'));
    if (localStorageToken) {
      setUser(localStorageToken);
      blogService.setToken(localStorageToken.token);
    }
  }, []);

  useEffect(() => {
    if (notificationMessage) {
      setTimeout(() => {
        setNotificationMessage('');
        setNotificationType('');
      }, 3000);
    }
  }, [notificationMessage]);

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notificationMessage}
        notificationType={notificationType}
      />
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <>
          <h4>{user.name} is logged in</h4>
          <button onClick={() => handleLogout()}>Logout</button>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createNewBlog={createNewBlog} />
          </Togglable>
          <div data-testid="blogList">
            {blogs.map((blog) => {
              const isBlogPoster =
                blog.user && blog.user.username === user?.username;
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  isBlogPoster={isBlogPoster}
                  deleteBlog={deleteBlog}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
