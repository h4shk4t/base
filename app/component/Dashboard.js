import React from "react";
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="btn">Sync Data</button>
      </div>
      <div className="dashboard-cards">
        <div className="card">Total Protocols Managed</div>
        <div className="card">Market Cap: $100B</div>
        <div className="card">Incentive Budgets</div>
      </div>
      <div className="chart">Chart/Graph Placeholder</div>
    </div>
  );
}

export default Dashboard;
