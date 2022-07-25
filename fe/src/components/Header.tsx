import { useAuth } from '../hooks';
import SignInUpForm from './SignInUp';
import { useNavigate, Link } from 'react-router-dom';

let LoggedIn = () => {
  const { authUser, signOut } = useAuth();
  let navigate = useNavigate();
  return (
    <div className="logged-in-state">
      <p>Welcome {authUser.email}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate('/share');
        }}
      >
        Share a movie
      </button>
      <button onClick={signOut}>Logout</button>
    </div>
  );
};

const Header = () => {
  const { authUser } = useAuth();
  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2>🏠Funny Movies</h2>
      </Link>
      {authUser ? <LoggedIn /> : <SignInUpForm />}
    </div>
  );
};

export default Header;
