import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import FindUsers from "../FindUsers";
import Footer from "../Footer";
import Profile from "../Profile";
import ProfileTabs from "../ProfileTabs";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export default function ProfileView(params) {
  const [tab, setTab] = useState("Posts");
  const Sorts = ["latest", "comments", "likes", "earliest"];

  let tabs = {
    Posts: <Card className=' my-3'>posts</Card>,
    Liked: <Card className=' my-3' >liked</Card>,
    Comments: <Card className=' my-3' >comments</Card>,
  };

  return (
    <>
      <Container className=" my-3 w-75">
        <Row className="justify-content-md-center ">
          <Col>
            {" "}
            <ProfileTabs tab={tab} setTab={setTab} />
            <Card className=" d-flex flex-row   align-items-center p-2 ">
              <p className=' w-auto'>sort by :</p>
              <Form.Select aria-label="Default select example" className=' w-25'>
              {Sorts.map((elem) => {
              return <option value={elem}>{elem}</option>;
            })}
              </Form.Select>
            </Card>
            {tabs[tab]}
          </Col>
          <Col lg="3">
            <Stack>
              <Profile />
              <FindUsers />
              <Footer />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}
