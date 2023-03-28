import React, { useContext, useRef, useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import LinesEllipsis from "react-lines-ellipsis";
import { LikeButton } from "./LikeButton";
import UserInfo from "./UserInfo";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import IconButton from "./IconButton";

export function Post(props) {
  const navigate = useNavigate();
  const [deleteButton, setDeleteButton] = useState(false);
  const [edit, setEdit] = useState(false);
  const { post, setPosts} = props;
  const { user } = useContext(UserContext);

  const contentRef = useRef();
  let { postId } = useParams();
  console.log(props.top)

  function handleEdit() {
    setEdit(!edit);
  }

  function handleEditText() {
    fetch(`http://localhost:5000/api/posts/UpdatePost/${postId}`, {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: contentRef.current.value, id: post._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          setPosts((prevPosts) =>
            prevPosts.filter((prevPost) => prevPost._id !== post._id)
          );
        }
      });

    setEdit(!edit);
  }
  function handleDelete() {
    fetch(`http://localhost:5000/api/posts/DeletePost/${postId}`, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: post._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setPosts((prevPosts) =>
            prevPosts.filter((prevPost) => prevPost._id !== post._id)
          );
        }
      });
    setDeleteButton(!deleteButton);
    navigate("/");
  }
  async function handleLike() {
    await fetch(`http://localhost:5000/api/posts/likePost/${postId}`, {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: post._id }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.error) alert(data.error);
        else {
          setPosts((prevPosts) => {
            return prevPosts.map((prevPost) => {
              if (prevPost._id === data.data._id) {
                return data.data;
              }
              return prevPost;
            });
          });
        }
      });
  }
  return (
      <div className="  card  my-3 d-flex flex-row">
        < >
          <LikeButton
            handleLike={handleLike}
            Style={" "}
            Count={post.likeCount}
          />
        </>

        <div className="   w-100">
          <div className=" card-header d-flex p-1 justify-content-between align-items-center">
            {props.top ? (
              <UserInfo
                username={post.Owner.username}
                image={post.Owner.image}
                createdAt={post.createdAt}
                top={true}
                id={post.Owner._id}
              />
            ) : (
              <UserInfo
                username={post.Owner.username}
                image={post.Owner.image}
                createdAt={post.createdAt}
                edited={post.edited}  
                id={post.Owner._id}
              />
            )}
            {(user._id === post.Owner._id || user.isAdmin) && (
              <div className=" d-flex p-1 justify-content-between align-items-center">
                <IconButton>
                  {edit ? (
                    <AiOutlineCloseCircle
                      style={{ color: "blue" }}
                      onClick={handleEdit}
                    />
                  ) : (
                    <AiOutlineEdit
                      style={{ color: "blue" }}
                      onClick={handleEdit}
                    />
                  )}
                </IconButton>
                <IconButton>
                  {deleteButton ? (
                    <AiOutlineCloseCircle
                      style={{ color: "red", marginInline: "10px" }}
                      onClick={() => setDeleteButton(!deleteButton)}
                    />
                  ) : (
                    <AiOutlineDelete
                      style={{ color: "red", marginInline: "10px" }}
                      onClick={() => handleDelete()}
                    />
                  )}
                </IconButton>
              </div>
            )}
          </div>
          <div className="card-body pb-0">
            <h3
              className="card-title  d-inline-block text-break"
              onClick={() => {
                navigate(`/post/view/${post._id}`);
              }}
            >
              {post.title}
            </h3>
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
              <div className=" d-flex mt-2 ">
                <AiOutlineComment size={20} />
                <p className=" px-1">{post.commentsCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
