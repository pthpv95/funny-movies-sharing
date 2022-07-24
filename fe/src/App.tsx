import { Route, Routes } from 'react-router-dom';
import { Home, ShareMovie } from './pages';
import AuthProvider from './providers/AuthProvider';
import './styles.scss';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<ShareMovie />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
