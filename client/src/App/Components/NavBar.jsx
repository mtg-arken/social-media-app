import { useState, useEffect, useContext } from "react";
import { AiOutlineSearch, AiFillHome, AiFillHighlight } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";

import { UserContext } from "../Context/UserProvider";
import { Link } from "react-router-dom";
import { logout } from "../Services/Http/api";

function NavBar(props) {
  const { user, setUser } = useContext(UserContext);

  const [width, setWindowWidth] = useState(0);
  const [searchIcon, setSearchIcon] = useState(false);
  const mobile = width < 768;
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!mobile) setSearchIcon(false);
  }, [mobile]);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };
  const handleLogOut = async () => {
    let response = await logout();
    response.text();
    setUser({});
  };
  return (
    <div className="  d-flex flex-column ">
      <div className={`navbar ${searchIcon ? "" : "mb-4"} bg-light`}>
        <div className="container ">
          <div className="d-flex flex-row w-100  mx-4  justify-content-between align-items-center ">
            {!mobile ? (
              <>
                <Link to="/" style={{ fontSize: "30px" }}>
                  <div className="d-flex align-items-center">
                    <AiFillHighlight />
                    Pinkit
                  </div>
                </Link>
                <input
                  type="search"
                  placeholder="Search"
                  className="form-control w-auto"
                  required
                />
              </>
            ) : (
              <div className=" d-flex align-items-center justify-content-between w-50">
                <Link to="/">
                  <AiFillHighlight style={{ fontSize: "30px" }} />{" "}
                </Link>
                <button
                className="  "
                  style={{ borderRadius: "50%"}}
                  onClick={handleSearchIcon}
                >
                  <AiOutlineSearch />
                </button>
              </div>
            )}

            <div className=" d-flex  justify-content-between align-items-center">
              <Link to="/" className=" p-3">
                <AiFillHome style={{ fontSize: "20px" }} />
              </Link>
              {Object.keys(user).length !== 0 ? (
                <>
                  <Link to="/Messenger">
                    <BsFillChatDotsFill style={{ fontSize: "20px" }} />
                  </Link>
                  <Link to={`/profile/${user._id}`} className=" py-1 px-2">
                    <img
                      src={user.image}
                      alt="Logo"
                      style={{
                        clipPath: "circle(40%) ",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </Link>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/LogIn" className=" mx-2 ">
                    login
                  </Link>

                  <Link to="/SingUp" className=" mx-2">
                    SingUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {searchIcon && (
        <input
          type="search"
          placeholder="Search"
          className={`form-control mb-4  ${searchIcon ? "" : "d-none"} `}
          required
        />
      )}
      {props.children}
    </div>
  );
}

export default NavBar;
