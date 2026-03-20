import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";

export default function Employees(){

  const [employees,setEmployees] = useState(null);
  const [message,setMessage] = useState("");

  const fetchEmployees = async () => {
    const res = await api.get("/employees/");
    setEmployees(res.data);
  };

  useEffect(()=>{
    fetchEmployees();
  },[]);

  const deleteEmployee = async(id)=>{

    const confirmDelete = window.confirm("Delete this employee?");
    if(!confirmDelete) return;

    await api.delete(`/employees/${id}/`);

    setMessage("Employee deleted successfully");
    fetchEmployees();

  };

  if(!employees) return <Loader/>

  if(employees.length === 0)
    return <EmptyState message="No employees found"/>

  return(

    <div className="container">

      <div className="page-header">

        <div>
          <h2>Employees</h2>
          <p className="subtext">
            Total Employees: {employees.length}
          </p>
        </div>

        <Link to="/add">
          <button>Add Employee</button>
        </Link>

      </div>

      {message && (
        <p className="success-message">{message}</p>
      )}

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {employees.map(emp => (

              <tr key={emp.id}>

                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={()=>deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}