import React, { useEffect, useState } from 'react';
import AddUserModal from '../components/AddUserModal';
import userService from '../services/userService';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    const data = await userService.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    await userService.deleteUser(userId);
    fetchUsers();
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Member</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddUserModal onClose={() => setIsModalOpen(false)} onUserAdded={fetchUsers} />
      )}
    </div>
  );
};

export default Home;
