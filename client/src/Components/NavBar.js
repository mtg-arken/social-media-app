import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect, useContext } from "react";
import { AiOutlineSearch, AiFillHome, AiFillHighlight } from "react-icons/ai";
import Cookies from "js-cookie";
import { BsFillChatDotsFill } from "react-icons/bs";

import Button from "react-bootstrap/Button";
import { UserContext } from "../App";

function NavBar(props) {
  const { user, setUser } = useContext(UserContext);

  const [width, setWindowWidth] = useState(0);
  const [searchIcon, setSearchIcon] = useState(false);
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      fetch(`http://localhost:5000/api/users/GetUser`, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setUser(data);
          }
        });
    }
  }, [setUser]);
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
  const handleLogOut = () => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    }).then((data) => {
      data.text();
      setUser({});
    });
  };
  console.log(Object.keys(user).length === 0);

  return (
    <div className=" d-flex flex-column">
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
            {Object.keys(user).length !== 0 ? (
              <>
                <Nav.Link href="/SingUp">
                  <BsFillChatDotsFill />
                </Nav.Link>
                <img
                  src={user.image}
                  alt="Logo"
                  style={{
                    clipPath: "circle(40%) ",
                    width: "40px",
                    height: "40px",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link href="/SingUp">SingUp</Nav.Link>
                <Nav.Link href="/LogIn">login</Nav.Link>
              </>
            )}
          </div>
        </div>
      </Navbar>
      {props.children}
    </div>
  );
}

export default NavBar;
