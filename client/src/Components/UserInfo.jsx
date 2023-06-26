import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function UserInfo(props) {
  return (
    <>
      {props.top ? (
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
        </Link>
      ) : (
        <Link
          className="d-flex  text-decoration-none "
          to={`/Profile/${props.id}`}
        >
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
        </Link>
      )}
    </>
  );
}

export default UserInfo;
