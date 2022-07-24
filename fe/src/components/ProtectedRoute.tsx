import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../hooks";

const ProtectedRoute = () => {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/" />
  }

  return <Outlet />;
};

export default ProtectedRoute;