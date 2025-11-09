import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const styles = {
  container: {
    maxWidth: '420px',
    margin: '30px auto',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 12px #e0e0e0',
    padding: '30px 24px',
    fontFamily: 'Segoe UI, sans-serif'
  },
  h1: {
    color: '#0078d7',
    textAlign: 'center',
    margin: '0 0 24px 0'
  },
  button: {
    background: '#0078d7',
    border: 'none',
    color: '#fff',
    borderRadius: '4px',
    padding: '7px 16px',
    margin: '0 0 8px 0',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '15px'
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ececec'
  },
  todoTitle: {
    flex: 1,
    fontSize: '16px',
    color: '#333',
    marginLeft: '8px'
  },
  deleteButton: {
    background: '#e74c3c',
    marginLeft: '12px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 600,
    padding: '6px 10px',
    cursor: 'pointer'
  },
  status: {
    marginLeft: '16px',
    fontWeight: 600
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    margin: '16px 0',
    width: '100%',
    fontSize: '15px'
  }
};


  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');

  // Decode JWT payload
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:2000/api/login', { username, password });
      setToken(res.data.token);
      const decoded = decodeToken(res.data.token);
      setRole(decoded.role);
      fetchTodos(res.data.token);
      console.log(todos); 
      todos.forEach(todo => {
        console.log(todo.title);
      });

    } catch (err) {
      alert('Login failed');
    }
  };

  const logout = () => {
  setToken('');
  setRole('');
  setTodos([]);
  setUsername('');
  setPassword('');
  setTitle('');
};


  const fetchTodos = async (token) => {
    try {
      const res = await axios.get('http://localhost:2000/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(res.data);
    } catch (err) {
      alert('Failed to fetch todos');
    }
  };

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:2000/api/todos', { title }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      fetchTodos(token);

    } catch (err) {
      alert('Failed to add todo');
    }
  };
const toggleCompleted = async (todo) => {
  try {
    await axios.put(`http://localhost:2000/api/todos/${todo._id}`, {
      completed: !todo.completed,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTodos(token);  // Refresh list after update
  } catch (err) {
    alert('Failed to update todo');
  }
};

const deleteTodo = async (todoId) => {
  try {
    await axios.delete(`http://localhost:2000/api/todos/${todoId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTodos(token); // Refresh list after delete
  } catch (err) {
    alert('Failed to delete todo');
  }
};

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }
return (
  <div style={styles.container}>
    <h1 style={styles.h1}>Todo List {role && `(${role})`}</h1>
    {token && (
      <button onClick={logout} style={{ ...styles.button, background: '#ff8c00' }}>
        Logout
      </button>
    )}
    <ul style={styles.todoList}>
      {todos.map(todo => (
        <li key={todo._id} style={styles.todoItem}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo)}
          />
          <span style={styles.todoTitle}>{todo.title}</span>
          <button
            onClick={() => deleteTodo(todo._id)}
            style={styles.deleteButton}
          >
            Delete
          </button>
          <span
            style={{
              ...styles.status,
              color: todo.completed ? '#27ae60' : '#c0392b'
            }}
          >
            {todo.completed ? 'Done' : 'Pending'}
          </span>
        </li>
      ))}
    </ul>
    <input
      style={styles.input}
      placeholder="New Todo"
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
    <button style={styles.button} onClick={addTodo}>Add Todo</button>
    {!token && (
      <div>
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={login}>Login</button>
      </div>
    )}
  </div>
);

}

export default App;
