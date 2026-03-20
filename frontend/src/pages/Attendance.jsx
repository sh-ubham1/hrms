import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function Attendance(){

  const [employees,setEmployees] = useState([]);
  const [attendance,setAttendance] = useState(null);

  const [employee,setEmployee] = useState("");
  const [date,setDate] = useState("");
  const [status,setStatus] = useState("Present");

  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  const fetchAttendance = async () => {

    const res = await api.get("/attendance/");
    setAttendance(res.data);

  };

  useEffect(()=>{

    api.get("/employees/")
      .then(res => setEmployees(res.data));

    fetchAttendance();

  },[]);

  const submitAttendance = async(e)=>{

    e.preventDefault();

    setError("");
    setMessage("");

    try{

      await api.post("/attendance/",{
        employee,
        date,
        status
      });

      setMessage("Attendance marked successfully");

      setEmployee("");
      setDate("");
      setStatus("Present");

      fetchAttendance();

    }catch(err){

      if(err.response && err.response.data){
        setError(err.response.data);
      }else{
        setError("Failed to mark attendance");
      }

    }

  };

  if(!attendance) return <Loader/>

  return(

    <div className="container">

      <h2>Mark Attendance</h2>

      {message && (
        <p className="success-message">{message}</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      <form onSubmit={submitAttendance}>

        <select
          value={employee}
          onChange={e=>setEmployee(e.target.value)}
          required
        >

          <option value="">Select Employee</option>

          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}

        </select>

        <input
          type="date"
          value={date}
          onChange={e=>setDate(e.target.value)}
          required
        />

        <select
          value={status}
          onChange={e=>setStatus(e.target.value)}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button type="submit">Submit</button>

      </form>

      <h2 style={{marginTop:"40px"}}>Attendance Records</h2>

      {attendance.length === 0 ? (

        <p>No attendance records</p>

      ) : (

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {attendance.map(item => (

                <tr key={item.id}>

                  <td>{item.employee_name}</td>

                  <td>{item.date}</td>

                  <td>
                    <span
                      className={
                        item.status === "Present"
                          ? "status-present"
                          : "status-absent"
                      }
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}