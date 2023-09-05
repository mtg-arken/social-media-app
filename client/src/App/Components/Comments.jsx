import React, { useContext, useState } from "react";
import UserInfo from "./UserInfo";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import IconButton from "./ui/IconButton";
import { BsReply } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import { createComment, editComment } from "../Services/Http/api";

function Comments(props) {
  const { postId } = useParams();
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const { user } = useContext(UserContext);
  const [deleteButton] = useState(false);
  const [content, setcontent] = useState(null);
  const [replyContent, setReplyContent] = useState(null);
  const [index, setindex] = useState(null);

  function handleReply(i) {
    setindex(i);

    setReply(!reply);
  }
  function handleEdit(i) {
    setindex(i);
    setEdit(!edit);
    setcontent(null)
  }
  function handleDelete() {
  }

  async function handleEditComment(id) {
    let response = await editComment(id,content)
    if (response.error) {
          alert(response.error);
        } else {
          props.setComments((prevComment) => {
            return prevComment.map((comment) => {
              if (comment._id === id) {
                return response.data;
              }
              return comment;
            });
          });
        }
        setEdit(!edit);
  }
  async function handleReplyComment(id) {
    let data = await createComment(postId, replyContent, id);
    if (data.error) {
      alert(data.error);
    } else {
      props.setPost([data.data]);
    }
    setReply(!reply);
  }

  return (
    <>
      {!props.comments ? (
        <h3> no comments yet</h3>
      ) : (
        props.comments.map((comment, i) => (
          <div className="card mt-3 " key={comment._id}>
            <div className=" card-header d-flex justify-content-between align-items-center">
              <UserInfo
                username={comment.commenter.username}
                image={comment.commenter.image}
                createdAt={comment.createdAt}
                edited={comment.edited}
              />
              {(user._id === comment.commenter._id || user.isAdmin) && (
                <div className="  ">
                  <IconButton handleClick={() => handleReply(i)}>
                    <BsReply style={{ color: "blue" }} />
                  </IconButton>
                  <IconButton handleClick={() => handleEdit(i)}>
                    {edit && props.comments.indexOf(comment) === index ? (
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
              {edit && props.comments.indexOf(comment) === index ? (
                <div>
                  <textarea
                    className="form-control "
                    defaultValue={comment.Content}
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
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
                  {reply && props.comments.indexOf(comment) === index && (
                    <div>
                      <textarea
                        className="form-control"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
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
                          <div>
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
