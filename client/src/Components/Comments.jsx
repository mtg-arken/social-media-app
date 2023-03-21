import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";

function Comments() {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/GetPostComments/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.data);
        console.log(data.data)
      });
  }, [postId]);

  return (
    <>
      {!comments? (
        <h3> no comments yet</h3>
      ) : 
        comments.map((comment,i) => (
          <div className="card mt-3 " key={i}>
            <div className=" card-header">
              <UserInfo
                username={comment.commenter.username}
                image={comment.commenter.image}
                createdAt={comment.createdAt}
                edited={comment.edited}
              />
            </div>
            <div className="card-body ">
              <div className="card-text  ">{comment.Content}</div>
            </div>
          </div>
        ))
      }
    </>
  );
}

export default Comments;
