
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [jokes, setJokes] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = (data) => {
    // Perform authentication logic with dummy credentials
    const { username, password } = data;
    // For simplicity, using dummy credentials "admin" and "password"
    if (username === 'kiran' && password === 'kiran@2024') {
      setLoggedIn(true);
    }
  };

  const fetchJokes = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10');
      const data = await response.json();
      setJokes(data.jokes || []);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchJokes();
    }
  }, [loggedIn]);

  return (
    <div className="container mt-5">
      {!loggedIn ? (
        <LoginForm onSubmit={handleLogin} register={register} handleSubmit={handleSubmit} errors={errors} />
      ) : (
        <Homepage jokes={jokes} />
      )}
    </div>
  );
};

const LoginForm = ({ onSubmit, register, handleSubmit, errors }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-3">
      <label htmlFor="username" className="form-label">Username</label>
      <input type="text" id="username" className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register('username', { required: 'Username is required' })} />
      {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password', { required: 'Password is required' })} />
      {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
);

const Homepage = ({ jokes }) => (
  <div>
    <h1 className="mb-4">Jokes</h1>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Joke</th>
        </tr>
      </thead>
      <tbody>
        {jokes.map((joke) => (
          <tr key={joke.id}>
            <td>{joke.id}</td>
            <td>{joke.joke}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default App;
