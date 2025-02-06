const DATA_FILE = './data/users.json'; // Directly reference the JSON file

const userService = {
  getUsers: async () => {
    const response = await fetch(DATA_FILE);
    const data = await response.json();
    return data;
  },

  getUserById: async (userId) => {
    const users = await userService.getUsers();
    return users.find(user => user.id === userId);
  },

  addUser: async (user) => {
    const users = await userService.getUsers();
    user.id = users.length ? users[users.length - 1].id + 1 : 1; // Assign new ID
    users.push(user);
    // Here you would typically send a POST request to your backend to save the user
    return user;
  },

  updateUser: async (userId, user) => {
    const users = await userService.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...user };
      // Here you would typically send a PUT request to your backend to update the user
    }
  },

  deleteUser: async (userId) => {
    const users = await userService.getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    // Here you would typically send a DELETE request to your backend to delete the user
  }
};

export default userService;
