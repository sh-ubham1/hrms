import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function Dashboard() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    api.get("/dashboard/summary/")
      .then(res => setData(res.data))
      .catch(() => setError("Failed to load dashboard data"));

  }, []);

  if(error){
    return (
      <div className="container">
        <p style={{color:"red"}}>{error}</p>
      </div>
    );
  }

  if(!data) return <Loader />;

  return (
    <div className="container">

      <div style={{marginBottom:"25px"}}>
        <h1 style={{marginBottom:"6px"}}>HRMS Dashboard</h1>
        <p style={{color:"#666"}}>
          Overview of employee attendance and workforce status
        </p>
      </div>

      <div className="dashboard-grid">

        <div className="card">
          <div className="card-header">
            <span className="card-title">Total Employees</span>
          </div>

          <div className="card-value">
            {data.total_employees}
          </div>

          <div className="card-footer">
            Total registered employees in the system
          </div>
        </div>


        <div className="card">
          <div className="card-header">
            <span className="card-title">Present Today</span>
          </div>

          <div className="card-value success">
            {data.present_today}
          </div>

          <div className="card-footer">
            Employees present today
          </div>
        </div>


        <div className="card">
          <div className="card-header">
            <span className="card-title">Absent Today</span>
          </div>

          <div className="card-value danger">
            {data.absent_today}
          </div>

          <div className="card-footer">
            Employees absent today
          </div>
        </div>

      </div>

    </div>
  );
}