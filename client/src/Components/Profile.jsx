import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../Services/api";

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const postSCount = useRef(0);
  const likeCount = useRef(0);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getProfile(userId)
      if (response.error) {
        alert(response.error);
      } else {
        setUser(response.user);
        likeCount.current = response.likeCount;
        postSCount.current = response.postsCount;
      }
    };
    fetchUser()
  }, [userId]);
  function handleMessage(){
    navigate('/Messanger', { state: {name :user.username , image:user.image , id:user._id} })
  }

  return (
    <div className="card d-flex flex-column justify-content-evenly align-items-center">
      <img
        src={user.image}
        alt="Logo"
        style={{ clipPath: "circle(40%) ", width: "120px", height: "120px" }}
      />
      <h1>{user.username}</h1>
      <h6>bio :{user.bio ? user.bio : " no bio yet"}</h6>
      <button onClick={handleMessage}>message </button>
      <div className="d-flex mt-2 " >
        <p> Likes : {likeCount.current ? likeCount.current : 0} </p>
        <p className=" ml-3"> posts : {postSCount.current ? postSCount.current : 0} </p>
      </div>
    </div>
  );
}

export default Profile;
