import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { Home, ShareMovie } from './pages';
import AuthProvider from './providers/AuthProvider';
import './styles.scss';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<ShareMovie />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
