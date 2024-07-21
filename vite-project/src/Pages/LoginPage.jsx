import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Retrieve stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if any stored user matches the entered credentials
    const storedUser = storedUsers.find(user => user.email === email && user.password === password);

    if (storedUser) {
      setUser({ email }); // Set user state
      navigate('/search'); // Redirect to SearchPage upon successful login
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900"
      style={{ height: '100vh' }} // Ensure full viewport height
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.freecreatives.com/wp-content/uploads/2016/04/Abstract-Website-Background.jpg)'}}></div>
      <div
        className="relative p-8 bg-white bg-opacity-80 max-w-sm mx-auto rounded-lg shadow-lg"
        style={{ width: '400px' }} // Set desired width
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">Login</h1>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-purple-700 font-bold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-purple-700 font-bold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition duration-200"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="block text-center font-bold text-purple-700 cursor-pointer hover:underline mt-4"
          >
            Dont have an account? Sign up here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
