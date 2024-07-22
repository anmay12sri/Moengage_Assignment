// import React, { useState } from 'react';

// function SignUpForm({ onSignUp }) {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSignUp(username, email, password);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <label>Username</label>
//         <input 
//           type="text" 
//           value={username} 
//           onChange={(e) => setUsername(e.target.value)} 
//           className="w-full border rounded px-3 py-2"
//         />
//       </div>
//       <div>
//         <label>Email</label>
//         <input 
//           type="email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           className="w-full border rounded px-3 py-2"
//         />
//       </div>
//       <div>
//         <label>Password</label>
//         <input 
//           type="password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           className="w-full border rounded px-3 py-2"
//         />
//       </div>
//       <button type="submit" className="w-full bg-blue-500 text-white rounded py-2">Sign Up</button>
//     </form>
//   );
// }

// export default SignUpForm;
