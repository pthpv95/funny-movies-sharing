import { useState } from 'react';

const Header = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
  };

  return (
    <div className="header">
      <h2>Funny Movies</h2>
      <form onSubmit={handleSubmit} className="form-sign-in-up">
        <input
          type="email"
          value={email}
          required
          placeholder="email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          required
          placeholder="password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <button type="submit">Login / Register</button>
      </form>
    </div>
  );
};

export default Header;
