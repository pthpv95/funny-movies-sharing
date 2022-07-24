import { useAuth } from '../hooks';
import SignInUpForm from './SignInUp';

let LoggedIn = () => {
  const { authUser, signOut } = useAuth();
  return (
    <div className="logged-in-state">
      <p>Welcome {authUser.email}</p>
      <button>Share a movie </button>
      <button onClick={signOut}>Logout</button>
    </div>
  );
};

const Header = () => {
  const { authUser } = useAuth();
  return (
    <div className="header">
      <h2>Funny Movies</h2>
      {authUser ? <LoggedIn /> : <SignInUpForm />}
    </div>
  );
};

export default Header;
