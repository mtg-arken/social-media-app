import React from "react";
import Moment from "react-moment";
import {  useNavigate } from "react-router-dom";

function UserInfo(props) {
  const navigate = useNavigate();
  const { top } = props;
  const handleClick = () => {
    navigate(`/users/Profile?id=${props.id}`);
  };
  return (
    <>
      {top ? (
        <div className="d-flex" onClick={handleClick}>
          <img
            src={props.image}
            alt="Logo"
            style={{ clipPath: "circle(40%) ", width: "40px", height: "40px" }}
          />
          <p className=" text-secondary px-2">{props.username}</p>
        </div>
      ) : (
        <div className="d-flex  " onClick={handleClick}>
          <img
            src={props.image}
            alt="Logo"
            style={{ clipPath: "circle(40%)", width: "40px" }}
          />
          <div className=" d-flex pt-3   ">
            <p className=" text-secondary px-2">{props.username}</p>
            <>
              <p className=" text-secondary px-2">
                posted :<Moment fromNow>{props.createdAt}</Moment>
              </p>
              {props.edited && <p className=" text-secondary px-2">(edited)</p>}
            </>
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfo;
