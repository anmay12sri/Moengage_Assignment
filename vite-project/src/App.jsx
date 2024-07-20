// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignupPage';
import SearchPage from './Pages/SearchPage';
import ListsPage from './Pages/ListsPage';
import { AuthProvider, AuthContext } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search" element={
          <PrivateRoute>
            <SearchPage />
          </PrivateRoute>
        } />
        <Route path="/lists" element={
          <PrivateRoute>
            <ListsPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/signup" />;
};

export default App;
