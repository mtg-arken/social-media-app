import { Link } from "react-router-dom";
import { Register } from "../Services/api";
import { useState } from "react";

export default function SignUpView(params) {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  function handleSubmit() {
    Register({ UserName, Email, Password });
  }
  return (
    <div className=" d-flex flex-column align-items-center mt-5">
      <h1 className=" mb-5">Pinkit</h1>
      <h4 className=" my-3">Sign Up</h4>
      <h6>
        Already have an account? <Link to="/LogIn">Login</Link>
      </h6>
      <div className=" d-flex flex-column justify-content-center w-25">
        <div className="form-floating mt-3 mb-3">
          <input
            type="text"
            className="form-control"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>UserName</label>
        </div>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="form-floating mt-3 mb-3">
          <input
            type="text"
            className="form-control"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button className="btn btn-outline-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <p className=" mt-5">
        Copyright © 2022 <Link to="/">pinkit</Link>
      </p>
    </div>
  );
}
