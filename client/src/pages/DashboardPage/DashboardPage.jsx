import Sidebar from "../../components/Sidebar/Sidebar";

import "./DashboardPage.css";

function DashboardPage() {
  return (
    <div id="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <header>
          <h1>Hello Jake</h1>
          <span className="circle" />
        </header>

        <p className="select-date">Showing tasks for 23 June</p>

        <div className="box-container">
          <div className="box">3 tasks left</div>
          <div className="box box-green">7 tasks completed</div>
        </div>

        <h1>Your list</h1>
      </div>
    </div>
  );
}

export default DashboardPage;
