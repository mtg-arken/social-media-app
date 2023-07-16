import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import LinesEllipsis from "react-lines-ellipsis";
import { LikeButton } from "./ui/LikeButton";
import UserInfo from "./UserInfo";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "./ui/IconButton";
import { UserContext } from "../Context/UserProvider";
import { deletePost, editPost, likePost } from "../Services/api";

export function Post(props) {
  const navigate = useNavigate();
  const [deleteButton, setDeleteButton] = useState(false);
  const [edit, setEdit] = useState(false);
  const { post, setPosts } = props;
  const { user } = useContext(UserContext);

  
  const contentRef = useRef();
  function handleEdit() {
    setEdit(!edit);
  }
  async function handleEditText() {
    let response = await editPost(post._id, contentRef.current.value);
    if (response.error) alert(response.error);
    else {
      setPosts((prevPosts) =>
        prevPosts.filter((prevPost) => {
          if (prevPost._id === post._id) return response.data;
          else return prevPost;
        })
      );
      props.setModifying(true)
    }
    setEdit(!edit);
  }

  function handleDelete() {
    let response = deletePost(post._id);
    if (response.error) {
      alert(response.error);
    } else {
      setPosts((prevPosts) =>
        prevPosts.filter((prevPost) => prevPost._id !== post._id)
      );
      props.setModifying(true)
    }
    setDeleteButton(!deleteButton);
  }
  async function handleLike() {
    let response = await likePost(post._id);
    if (response.error) alert(response.error);
    else {
      setPosts((prevPosts) => {
        return prevPosts.map((prevPost) => {
          if (prevPost._id === response.data._id) {
            return response.data;
          }
          return prevPost;
        });
      });
      props.setModifying(true)
    }
  }

  return (
    <div className="  card  my-3 d-flex flex-row">
      <LikeButton
        handleLike={handleLike}
        Count={post.likeCount}
        Style={
          "btn d-flex  flex-column justify-content-center align-items-center bg-light "
        }
      />
      <div className="   w-100">
        <div className=" card-header d-flex p-1 justify-content-between align-items-center  ">
          <UserInfo
            username={post.Owner?.username}
            image={post.Owner.image}
            createdAt={post.createdAt}
            top={true}
            id={post.Owner._id}
          />
          {(user?._id === post.Owner?._id && !props.top) && (
            <div className="d-flex p-1 justify-content-between align-items-center ">
              <IconButton handleClick={handleEdit}>
                {edit ? (
                  <AiOutlineCloseCircle style={{ color: "blue" }} />
                ) : (
                  <AiOutlineEdit style={{ color: "blue" }} />
                )}
              </IconButton>
              {deleteButton ? (
                <IconButton handleClick={() => setDeleteButton(!deleteButton)}>
                  <AiOutlineCloseCircle
                    style={{ color: "red", marginInline: "10px" }}
                  />
                </IconButton>
              ) : (
                <IconButton handleClick={handleDelete}>
                  <AiOutlineDelete
                    style={{ color: "red", marginInline: "10px" }}
                  />
                </IconButton>
              )}
            </div>
          )}
        </div>
        <div className="card-body pb-0">
          <Link
            className="card-title  d-inline-block text-break"
            to={`/post/view/${post._id}`}
          >
            {post.title}
          </Link>
          {edit ? (
            <div>
              <textarea
                className="form-control "
                ref={contentRef}
                defaultValue={post.content}
                style={{ height: "100px" }}
              />
              <button
                type="button"
                className="btn btn-outline-primary mt-2 w-100"
                onClick={() => handleEditText()}
              >
                Primary
              </button>
            </div>
          ) : (
            <LinesEllipsis
              text={post.content}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
              onClick={() => {
                navigate(`/post/view/${post._id}`);
              }}
            />
          )}

          {!props.top && (
            <Link
            className="d-flex mt-2 "
            to={`/post/view/${post._id}`}
          >
            <AiOutlineComment size={20} />
              <p className=" px-1">{post.commentsCount}</p>
          </Link>
            
          )}
        </div>
      </div>
    </div>
  );
}
