// // src/components/Auth/Register.js
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const { name, email, password, confirmPassword } = formData;

//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       console.error('Passwords do not match');
//       return;
//     }

//     try {
//       await register({ name, email, password });
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Registration failed', error);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           name="name"
//           value={name}
//           onChange={onChange}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email Address"
//           name="email"
//           value={email}
//           onChange={onChange}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={password}
//           onChange={onChange}
//           minLength="6"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           name="confirmPassword"
//           value={confirmPassword}
//           onChange={onChange}
//           minLength="6"
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setError('');
      // Redirect to tasks or dashboard if needed
      window.location.href = '/tasks';
    } catch (err) {
      setError('Failed to register. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;