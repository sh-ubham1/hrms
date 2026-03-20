import { Link } from "react-router-dom";

export default function Navbar(){

  return(

    <nav style={{
      background:"#2c3e50",
      padding:"15px"
    }}>

      <Link to="/" style={{color:"white",marginRight:20}}>
        Dashboard
      </Link>

      <Link to="/employees" style={{color:"white",marginRight:20}}>
        Employees
      </Link>

      <Link to="/attendance" style={{color:"white"}}>
        Attendance
      </Link>

    </nav>

  );

}