import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [creds, setcreds] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    if (json.success) {
      sessionStorage.setItem("token", json.authToken);
      window.location.replace("/");

    } else {
    }
  };

  const handleforgot= async (e)=>{
    e.preventDefault();
    if (creds.email===""){
      alert("email is required")
      
    }
    else{
    const response = await fetch(`http://localhost:3001/api/auth/forgotpass`, {
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
  return (
    <>
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
            id="exampleInputPassword1"
            onChange={onChange}
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      
      </form>
      <form >  <button  type="submit" onClick={handleforgot}>forgot password..?</button></form>
    </>
  );
};

export default Login;
