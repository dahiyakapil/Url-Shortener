import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./MainLayout.css";
import '../Header/Header.css';
import '../Sidebar/Sidebar.css';

const MainLayout = () => {
  return (
    <div className="container">
      <Sidebar className="sidebar" />
      <div className="main-content">
        <Header/>
        <div className="content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
