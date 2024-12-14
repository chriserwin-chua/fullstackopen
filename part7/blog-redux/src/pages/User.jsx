import React, { useState, useEffect } from 'react';
import userService from '../services/users';
import { Link, useParams } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const { id } = useParams();

  const getUsers = async () => {
    const userList = await userService.getAll();
    setUsers(userList);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (id && users) {
      setUser(users.find((user) => user.id === id));
    }
  }, [id, users]);

  if (id && user) {
    return (
      <div>
        <h1 className="text-2xl mb-4">{user.name}</h1>
        <h3 className="text-xl">Added blogs</h3>
        <ul className="pl-4 mt-2">
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      {!users ? (
        <p>No Users yet</p>
      ) : (
        <table className="border-separate border-spacing-2 border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600  px-2">Username</th>
              <th className="border border-slate-600 px-2">Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`} className="hover:underline hover:text-blue-500">
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
