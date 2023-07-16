import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../Services/api";
import { UserContext } from "../Context/UserProvider";

function Profile() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  const [ProfileUser, setProfileUser] = useState({});
  const postSCount = useRef(0);
  const likeCount = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getProfile(userId);
      if (response.error) {
        alert(response.error);
      } else {
        setProfileUser(response.user);
        likeCount.current = response.likeCount;
        postSCount.current = response.postsCount;
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const handleResize = () => {
      const imageStyle = {
        clipPath: "circle(40%)",
        width: window.innerWidth >= 992 ? "120px" : "60px",
        height: window.innerWidth >= 992 ? "120px" : "60px",
      };
      setImageStyle(imageStyle);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleMessage() {
    navigate("/Messenger", {
      state: {
        name: ProfileUser.username,
        image: ProfileUser.image,
        id: ProfileUser._id,
      },
    });
  }

  const Counts = (
    <div className="d-flex mt-2">
      <p>Likes: {likeCount.current ? likeCount.current : 0}</p>
      <p className="ml-3">
        Posts: {postSCount.current ? postSCount.current : 0}
      </p>
    </div>
  );

  const [imageStyle, setImageStyle] = useState({
    clipPath: "circle(40%)",
    width: window.innerWidth >= 992 ? "120px" : "60px",
    height: window.innerWidth >= 992 ? "120px" : "60px",
  });

  return (
    <div className="card d-flex flex-lg-column justify-content-evenly align-items-center">
      <div className=" container " >
        <div className="d-flex justify-content-lg-center justify-content-between  align-items-center ">
          <div className="d-flex flex-lg-column align-items-center">
            <img src={ProfileUser.image} alt="Logo" style={imageStyle} />
            <h3>{ProfileUser.username}</h3>
          </div>
          <div className="d-lg-none">{Counts}</div>
        </div>
      </div>

      <hr className="w-75 d-lg-none" />
      <h6>Bio: {ProfileUser.bio ? ProfileUser.bio : "No bio yet"}</h6>
      {user._id === userId ? (
        <Link to="">Edit profile</Link>
      ) : (
        <button className="btn btn-outline-primary my-lg-0 my-2" onClick={handleMessage}>
          Message
        </button>
      )}
      <div className="d-none d-lg-block">{Counts}</div>
    </div>
  );
}

export default Profile;
