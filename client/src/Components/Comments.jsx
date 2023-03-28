import React, { useContext, useRef, useState } from "react";
import UserInfo from "./UserInfo";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import IconButton from "./IconButton";
import { UserContext } from "../App";
import { BsReply } from "react-icons/bs";
import { useParams } from "react-router-dom";

function Comments(props) {
  const contentRef = useRef();
  const replyContentRef = useRef();

  const { postId } = useParams();

  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);

  const { user } = useContext(UserContext);
  const [deleteButton, setDeleteButton] = useState(false);
  function handleReply() {
    setReply(!reply);
  }
  function handleEdit() {
    setEdit(!edit);
  }
  function handleDelete() {
    console.log("delet");
  }
  function handleEditComment(id) {
    console.log(contentRef.current.value, id);
    fetch(`http://localhost:5000/api/comments/UpdateComment/${id}`, {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: contentRef.current.value, id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          props.setComments((prevComment) => {
            return prevComment.map((comment) => {
              if (comment._id === id) {
                return data.data;
              }
              return comment;
            });
          });
        }
        setEdit(!edit);
      });
  }
  function handleReplyComment(id) {
    fetch(`http://localhost:5000/api/comments/CreateComment/${postId}`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        content: replyContentRef.current.value,
        parentId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          props.setPost([data.data]);
        }
        setReply(!reply);
      });
  }
  console.log(props.comments)

  return (
    <>
      {!props.comments ? (
        <h3> no comments yet</h3>
      ) : (
        props.comments.map((comment, i) => (
          <div className="card mt-3 " key={i}>
            <div className=" card-header d-flex justify-content-between align-items-center">
              <UserInfo
                username={comment.commenter.username}
                image={comment.commenter.image}
                createdAt={comment.createdAt}
                edited={comment.edited}
              />
              {(user._id === comment.commenter._id || user.isAdmin) && (
                <div className="  ">
                  <IconButton handleClick={handleReply}>
                    <BsReply style={{ color: "blue" }} />
                  </IconButton>
                  <IconButton handleClick={handleEdit}>
                    {edit ? (
                      <AiOutlineCloseCircle style={{ color: "blue" }} />
                    ) : (
                      <AiOutlineEdit style={{ color: "blue" }} />
                    )}
                  </IconButton>

                  {deleteButton ? (
                    <IconButton handleClick={handleDelete}>
                      <AiOutlineCloseCircle style={{ color: "red" }} />
                    </IconButton>
                  ) : (
                    <IconButton handleClick={handleDelete}>
                      <AiOutlineDelete style={{ color: "red" }} />
                    </IconButton>
                  )}
                </div>
              )}
            </div>
            <div className="card-body ">
              {edit ? (
                <div>
                  <textarea
                    className="form-control "
                    ref={contentRef}
                    defaultValue={comment.Content}
                    style={{ height: "100px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-2 w-100"
                    onClick={() => handleEditComment(comment._id)}
                  >
                    Primary
                  </button>
                </div>
              ) : (
                <>
                  <div className="card-text  mb-3 ">{comment.Content}</div>
                  {reply && (
                    <div>
                      <textarea
                        className="form-control "
                        ref={replyContentRef}
                        style={{ height: "100px" }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary mt-2 w-100"
                        onClick={() => handleReplyComment(comment._id)}
                      >
                        Primary
                      </button>
                    </div>
                  )}
                  {comment.children?.map((child, i) => (
                    <div className="card  my-2" key={i}>
                      <div className="card-header   d-flex justify-content-between align-items-center">
                        {" "}
                        <UserInfo
                          username={child.commenter.username}
                          image={child.commenter.image}
                          createdAt={child.createdAt}
                          edited={child.edited}
                        />{" "}
                        {(user._id === child.commenter._id || user.isAdmin) && (
                          <div >
                            <IconButton handleClick={handleEdit}>
                              {edit ? (
                                <AiOutlineCloseCircle
                                  style={{ color: "blue" }}
                                />
                              ) : (
                                <AiOutlineEdit style={{ color: "blue" }} />
                              )}
                            </IconButton>

                            {deleteButton ? (
                              <IconButton handleClick={handleDelete}>
                                <AiOutlineCloseCircle
                                  style={{ color: "red" }}
                                />
                              </IconButton>
                            ) : (
                              <IconButton handleClick={handleDelete}>
                                <AiOutlineDelete style={{ color: "red" }} />
                              </IconButton>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="card-text p-2 ">{child.Content}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Comments;
