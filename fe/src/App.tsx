import { Home } from './pages';
import AuthProvider from './providers/AuthProvider';
import './styles.scss';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Home />
      </div>
    </AuthProvider>
  );
}

export default App;
