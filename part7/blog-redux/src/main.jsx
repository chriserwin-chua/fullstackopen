import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
