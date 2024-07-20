import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = React.useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    // Save user data to local storage
    localStorage.setItem('user', JSON.stringify({ username, email, password }));

    // Redirect to login page with a success message
    navigate('/login?message=signup-success');
  };

  return (
    <div className="p-6 bg-gray-100 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="space-y-6">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            ref={usernameRef}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            ref={emailRef}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            ref={passwordRef}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2"
        >
          Sign Up
        </button>
        <Link
          to="/login"
          className="font-bold text-blue-500 cursor-pointer hover:underline"
        >
          Already a user? Click here to LOGIN!
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
