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
  function handleMessage() {
    navigate("/Messanger", {
      state: {
        name: ProfileUser.username,
        image: ProfileUser.image,
        id: ProfileUser._id,
      },
    });
  }

  return (
    <div className="card d-flex flex-column justify-content-evenly align-items-center">
      <img
        src={ProfileUser.image}
        alt="Logo"
        style={{ clipPath: "circle(40%) ", width: "120px", height: "120px" }}
      />
      <h3>{ProfileUser.username}</h3>
      <h6>bio :{ProfileUser.bio ? ProfileUser.bio : " no bio yet"}</h6>
      {user._id == userId ? (
        <Link to=""> edit profile</Link>
      ) : (
        <button className="btn btn-outline-primary " onClick={handleMessage}>
          message{" "}
        </button>
      )}
      <div className="d-flex mt-2 ">
        <p> Likes : {likeCount.current ? likeCount.current : 0} </p>
        <p className=" ml-3">
          {" "}
          posts : {postSCount.current ? postSCount.current : 0}{" "}
        </p>
      </div>
    </div>
  );
}

export default Profile;
