import "./Dashboard.css";
import React from "react";

import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <SideNav />
      <div className="dashboard_main_content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
