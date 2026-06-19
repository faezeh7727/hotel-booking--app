import {  useEffect, useState } from "react";
import { useAuth } from "../context/Authprovider";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email,setemail]=useState("faeze@gamil.com");
    const [password,setpassword]=useState("334");
    const navigate=useNavigate()
   const {login,user,isAthenticated}= useAuth();

   const handleSubmit =(e)=>{
    e.preventDefault();
    if(email && password) login(email,password);
   }

   //هگر کاربر وجود داشت وارد شو و به صفحه اصلی برئ

   useEffect(()=>{
   if(isAthenticated) navigate("/",{replace:true});
   },[isAthenticated,navigate])

    return (
    <div className="loginContainer">
      <h2 >Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}
