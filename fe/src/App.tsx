import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { Home, ShareMovie, Layout } from './pages';
import AuthProvider from './providers/AuthProvider';
import './styles.scss';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/share" element={<ShareMovie />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
