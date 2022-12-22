import React, { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "./NoteContext";


const Login = (props) => {
  const context = useContext(NoteContext);
    let { setforgotemail} =context;


  const [creds, setcreds] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://let-stock.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    if (json.success) {
      sessionStorage.setItem("token", json.authToken);
     navigate("/");

    } else {
    }
  };

  const handleforgot= async (e)=>{
    e.preventDefault();
    if (creds.email===""){
      alert("email is required")
      
    }

    else{
      setforgotemail(creds.email);
    const response = await fetch(`https://let-stock.vercel.app/api/auth/forgotpass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email }),
    });
    const json = await response.json();
    
    setTimeout(() => {
      alert("password reset email is sent your given gmail")
      
    }, 1000);
  }
  }
  function handleshowpass() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <> 
    <div className="container ">

      <form className="container px-10 my-5 w-50 " onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={onChange}
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
    <input
            type="password"
            className="form-control"
            required
            minLength={5}
            name="password"
            id="myInput"
            onChange={onChange}
            placeholder="Password"
          /><input type="checkbox" className="my-2" onClick={handleshowpass}/> Show Password
        </div> 
       
  

 


        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button> <br />
        <small>Don't have an account?<Link to='/Signup'>register here</Link>
  </small>
      </form>
      
      <form className="float-right" >  <button className="" type="submit" onClick={handleforgot}>forgot password..?</button></form>
      </div>  </>
  );
};

export default Login;
