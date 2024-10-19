import React from "react";
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>OpenBlock Labs</h2>
      <ul>
        <li className="active">Dashboard</li>
        <li>Data Models</li>
        <li>DeFi Insights</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
