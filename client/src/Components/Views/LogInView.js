
export default function LogInView(params) {
  return (
    <div className=" d-flex flex-column align-items-center mt-5">
      <h1 className=" mb-5">Pinkit</h1>
      <h4 className=" my-3">Login</h4>
      <h6>  
        Don't have an account yet? 
        <a href="SingUp"> Sign Up</a>
      </h6>
      <form className=" d-flex flex-column justify-content-center w-25">
        <div class="form-floating mb-3 mt-3">
          <input type="text" class="form-control" id="email" required />
          <label for="email">Email</label>
        </div>
        <div class="form-floating mt-3 mb-3">
          <input type="text" class="form-control" id="pwd" required />
          <label for="pwd">Password</label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>

      <p className=" mt-5">
        Copyright © 2022 <a href="/">pinkit</a>
      </p>
    </div>
  );
}
