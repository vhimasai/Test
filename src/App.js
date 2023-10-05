import React, { useState, useEffect } from 'react';
import UserResponse from './users.response.json';
import TodoResponse from './todos.response.json';
function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [todosData, setTodosData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    // Fetch users and todos data
    setUsersData(UserResponse);
    setTodosData(TodoResponse);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the user exists in the usersData
    const user = usersData.find((user) => user.username === username);

    if (user) {
      // User exists, set the logged-in user
      setLoggedInUser(user);
    } else {
      // User does not exist, reset the form and show an error message
      setUsername('');
      setPassword('');
      alert(`No user with username '${username}' was found.`);
    }
  };

  const handleLogout = () => {
    // Clear the logged-in user and reset the form
    setLoggedInUser(null);
    setUsername('');
    setPassword('');
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="App">
      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser.name}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <label>
            Show completed Todos:
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={toggleShowCompleted}
            />
          </label>
          <ul>
            {todosData
              .filter(
                (todo) =>
                  todo.userId === loggedInUser.id &&
                  (showCompleted ? todo.completed : true)
              )
              .map((todo) => (
                <li key={todo.id}>{todo.title}</li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>User Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;