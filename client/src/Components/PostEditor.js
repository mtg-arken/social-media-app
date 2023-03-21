import { Card} from "react-bootstrap";

import { RxAvatar } from "react-icons/rx";

export default function PostEditor(params) {
  return (
    <>
      <a href=".."> Go back to posts </a>
      <Card>
        <Card.Body className=" d-flex  align-items-center">
          <RxAvatar />
          <Card.Text className=" m-0 mr-3 ">
            {" "}
            What would you like to post today ?
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <form className=" d-flex flex-column justify-content-center ">
            <div class="form-floating mb-3 mt-3">
              <input type="text" class="form-control" id="Title" required />
              <label for="Title">Title</label>
            </div>
            <div class="form-floating mt-3 mb-3">
            <textarea   id="floatingTextarea2"  className=" form-control h-100" rows="5"/>
              <label for="content">content</label>
            </div>
            <button type="submit" class="btn btn-outline-info">
              Submit
            </button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}
