import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function LogInView(params) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const {  setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/auth/Login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        Email: emailRef.current.value,
        Password: passwordRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.error ? alert(data.error) :
        setUser(data.user);
        navigate("/");
      });
  };

  return (
    <div className=" d-flex flex-column align-items-center mt-5">
      <h1 className=" mb-5">Pinkit</h1>
      <h4 className=" my-3">Login</h4>
      <h6>
        Don't have an account yet?
        <a href="SingUp"> Sign Up</a>
      </h6>
      <form
        className=" d-flex flex-column justify-content-center w-25"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="email"
            ref={emailRef}
            required
          />
          <label>Email</label>
        </div>
        <div className="form-floating mt-3 mb-3">
          <input
            type="text"
            className="form-control"
            id="pwd"
            ref={passwordRef}
            required
          />
          <label>Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <p className=" mt-5">
        Copyright © 2022 <a href="/">pinkit</a>
      </p>
    </div>
  );
}
