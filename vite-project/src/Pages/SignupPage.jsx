import   { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some(user => user.email === email);

    if (userExists) {
      setError('Email already registered. Please login.');
      return;
    }

    storedUsers.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(storedUsers));

    navigate('/login?message=signup-success');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.freecreatives.com/wp-content/uploads/2016/04/Abstract-Website-Background.jpg)' }}></div>
      <div className="relative p-8 bg-white bg-opacity-80 max-w-lg mx-auto rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block mb-1 text-purple-700">Username</label>
            <input
              type="text"
              ref={usernameRef}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-purple-700">Email</label>
            <input
              type="email"
              ref={emailRef}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-purple-700">Password</label>
            <input
              type="password"
              ref={passwordRef}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white rounded py-2 hover:bg-purple-800 transition duration-200"
          >
            Sign Up
          </button>
          <Link
            to="/login"
            className="block text-center font-bold text-purple-700 cursor-pointer hover:underline mt-4"
          >
            Already a user? Click here to LOGIN!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
