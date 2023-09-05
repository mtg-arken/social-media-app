import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function UserInfo(props) {
  return (
    <Link
      className="d-flex align-items-center text-decoration-none "
      to={`/Profile/${props.id}`}
    >
      <img
        src={props.image}
        alt="Logo"
        style={{ clipPath: "circle(40%) ", width: "40px", height: "40px" }}
      />
      <p className=" text-secondary px-2 mb-0">{props.username}</p>
      <p className={`text-secondary px-2 m-0 ${props.top && "d-none"}`}>
        <Moment fromNow>{props.createdAt}</Moment>
      </p>
    </Link>
  );
}

export default UserInfo;
