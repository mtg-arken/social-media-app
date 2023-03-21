import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import { AiOutlineSearch, AiFillHome, AiFillHighlight } from "react-icons/ai";
import Button from "react-bootstrap/Button";

function NavBar(props) {
  const [width, setWindowWidth] = useState(0);
  const [searchIcon, setSearchIcon] = useState(false);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 768;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  return (
    <div  className=" d-flex flex-column">
     
     <Navbar bg="light" expand="lg" className=" mb-4">
        <div
          style={
            !mobile
              ? {
                  paddingRight: "200px",
                  paddingLeft: "200px",
                  display: "flex ",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }
              : {
                  display: "flex ",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }
          }
        >
          {!mobile ? (
            <>
              <Navbar.Brand href="/">
                {" "}
                <AiFillHighlight />
                Pinkit
              </Navbar.Brand>

              <Form className="d-flex w">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </>
          ) : (
            <>
              <Navbar.Brand href="/">
                <AiFillHighlight />{" "}
              </Navbar.Brand>
              <Button
                style={{ borderRadius: "50%", marginLeft: "100px" }}
                onClick={handleSearchIcon}
              >
                <AiOutlineSearch />
              </Button>
            </>
          )}

          <div className=" d-flex">
            <Nav.Link href="/">
              <AiFillHome />
            </Nav.Link>
            <Nav.Link href="/SingUp">SingUp</Nav.Link>
            <Nav.Link href="/LogIn">LogIn</Nav.Link>
          </div>
        </div>
      </Navbar>
      {props.children}
    </div>
  );
}

export default NavBar;
