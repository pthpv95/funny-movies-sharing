import Header from './Header';
import { Outlet } from 'react-router-dom';
let Layout = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
