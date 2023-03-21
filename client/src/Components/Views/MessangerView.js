import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function MessangerView(params) {
  return (
    <>
      <Container
        claassName=" d-flex  align-content-center "
        style={{ marginTop: "30px" }}
      >
        <Row>
          <Col className="border">
            <div>
              <h1>no contacts</h1>
            </div>
          </Col>
          <Col className="border">
            <div>
              <h1>no messages</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
