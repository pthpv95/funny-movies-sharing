import { Outlet } from 'react-router-dom';
import { Header } from '../components';

let Layout = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
