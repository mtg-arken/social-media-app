import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import { login } from "../Services/Http/api";
export default function LogInView(params) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await login(
      emailRef.current.value,
      passwordRef.current.value
    );
    if (response.error) alert(response.error);
    else {
      setUser(response.user);
      navigate("/");
    }
  };

  return (
    <div className=" d-flex flex-column align-items-center mt-5">
      <h1 className=" mb-5">Pinkit</h1>
      <h4 className=" my-3">Login</h4>
      <h6>
        Don't have an account yet?
        <Link to="/SingUp"> Sign Up</Link>
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
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>
      <p className=" mt-5">
        Copyright © 2022 <Link to="/">pinkit</Link>
      </p>
    </div>
  );
}
