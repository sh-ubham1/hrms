import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddEmployee(){

  const navigate = useNavigate();

  const [form,setForm] = useState({
    employee_id:"",
    full_name:"",
    email:"",
    department:""
  });

  const [error,setError] = useState("");

  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };

  const handleSubmit = async(e)=>{

    e.preventDefault();

    setError("");

    try{

      await api.post("/employees/",form);

      navigate("/employees");

    }
    catch(err){

      if(err.response && err.response.data){

        const data = err.response.data;

        if(data.employee_id){
          setError(data.employee_id[0]);
        }
        else if(data.email){
          setError(data.email[0]);
        }
        else{
          setError("Validation error");
        }

      }
      else{
        setError("Server error");
      }

    }

  };

  return(

    <div className="container">

      <h2>Add Employee</h2>

      {error && (
        <p style={{color:"red",marginBottom:"10px"}}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <input
          name="employee_id"
          placeholder="Employee ID"
          onChange={handleChange}
          required
        />

        <input
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Employee
        </button>

      </form>

    </div>

  );

}