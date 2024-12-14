import { useEffect } from 'react';
import blogService from './services/blogs';
import Login from './pages/Login';
import Notification from './components/Notification';
import { setUser } from './reducers/userReducer';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import User from './pages/User';
import BlogPage from './pages/BlogPage';
import { useDispatch, useSelector } from 'react-redux';
import BlogView from './components/BlogView';
import { initializeBlog } from './reducers/blogReducer';

const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem('token'));
    if (localStorageToken) {
      dispatch(setUser(localStorageToken));
      blogService.setToken(localStorageToken.token);
    } else {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    dispatch(set({ token: null, username: '', name: '' }));
    localStorage.removeItem('token');
    blogService.setToken('');
    navigate('/login');
  };

  // useEffect(() => {
  //   dispatch(initializeBlog());
  // }, []);
  return (
    <div>
      <div className="flex h-8 gap-4 bg-slate-100 items-center p-8">
        <Link className="hover:bg-slate-800 hover:text-white p-2" to="/">
          Blogs
        </Link>
        <Link className="hover:bg-slate-800 hover:text-white p-2" to="/users">
          Users
        </Link>
        {user && <h4>{user.name} is logged in</h4>}
        <button className="hover:bg-slate-800 hover:text-white p-2" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
      <div className="py-4 px-8">
        <h1 className="text-3xl mb-4">Blogs</h1>
        <Notification />

        <Routes>
          <Route path="/users" element={<User />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<BlogPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
