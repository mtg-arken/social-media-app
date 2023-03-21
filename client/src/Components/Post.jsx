import React from "react";
import { AiOutlineComment } from "react-icons/ai";
import LinesEllipsis from "react-lines-ellipsis";
import { LikeButton } from "./LikeButton";
import UserInfo from "./UserInfo";
import { useNavigate } from "react-router-dom";

export function Post(props) {
  const navigate = useNavigate();
  const { post, key } = props;
  return (
    <div className=" card  my-3" key={key}>
      <div className="row g-0">
        <LikeButton
          Style={
            " d-flex flex-column  col-1  p-2 justify-content-start align-items-center justify-content-evenly"
          }
          Count={post.likeCount}
        />
        <div className="col">
          <div className="card-header d-flex p-1">
            {
              props.top? <UserInfo
              username={post.Owner.username}
              image={post.Owner.image}
              createdAt={post.createdAt}
              id={post.Owner._id}
            />:<UserInfo
              username={post.Owner.username}
              image={post.Owner.image}
              createdAt={post.createdAt}
              edited={post.edited}
              id={post.Owner._id}
            />
            }
            
          </div>
          <div
            className="card-body pb-0"
            onClick={() => {
              navigate(`/post/view/${post._id}`);
            }}
          >
            <h3 className="card-title  d-inline-block text-break">
              {post.title}
            </h3>
            <LinesEllipsis
              text={post.content}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
            {!props.top && (
              <div className=" d-flex mt-2 ">
                <AiOutlineComment size={20} />
                <p className=" px-1">{post.commentsCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
