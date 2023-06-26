import { Link } from "react-router-dom";

export default function SignUpView(params) {
  return (
    <div className=" d-flex flex-column align-items-center mt-5">
      <h1 className=" mb-5">Pinkit</h1>
      <h4 className=" my-3">Sign Up</h4>
      <h6>
        Already have an account? <Link to="/LogIn"  >Login</Link>
      </h6>
      <form className=" d-flex flex-column justify-content-center w-25">
        <div className="form-floating mt-3 mb-3">
          <input
            type="text"
            className="form-control"
            id="UserName"
            required
          />
          <label>UserName</label>
        </div>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="email"
            required
          />
          <label>Email</label>
        </div>
        <div className="form-floating mt-3 mb-3">
          <input
            type="text"
            className="form-control"
            id="pwd"
            required
          />
          <label>Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      
        <p className=" mt-5">
          Copyright © 2022 <Link to="/">pinkit</Link>
        </p>
      
    </div>
  );
}
