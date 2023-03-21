import { Col, Container, Row } from "react-bootstrap";
import PostEditor from "../PostEditor";
import SideBar from "../SideBar";
export default function CreatePostView(params) {
  return (
    <>
      <Container className=" my-3 w-75">
        <Row className="justify-content-md-center ">
          <Col>
            {" "}
            <PostEditor />
          </Col>
          <Col lg="3">
            <SideBar />
          </Col>
        </Row>
      </Container>
    </>
  );
}
