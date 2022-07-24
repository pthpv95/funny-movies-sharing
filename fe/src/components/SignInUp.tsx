import { useState } from 'react';
import { useAuth } from '../hooks';

let SignInUp = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let { signIn } = useAuth();

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
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
  );
};

export default SignInUp;
