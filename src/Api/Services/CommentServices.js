const DeletePostComments = (postID) => {
  return Comment.deleteMany({ post: postID });
};
const FindCommentById = (id) => {
  return Comment.findById(id);
};
const FindPostComments = (postID) => {
  return Comment.find({
    postID: postID,
    ParentID: { $eq: null },
  })
    .populate({
      path: "commenter",
      select: "-password",
    })
    .populate({
      path: "children",
      populate: {
        path: "commenter",
        select: "-password",
      },
    })
    .lean();
};
const UpdateCommentContent = (commentID, content) => {
  return Comment.findByIdAndUpdate(
    commentID,
    { Content: content, edited: true },
    { new: true }
  )
    .populate({ path: "commenter", select: "-password" })
    .populate({ path: "children", populate: { path: "children" } })
    .lean();
};
const FindUserComments = (userID) => {
  return Comment.find({ commenter: userID })
    .populate({ path: "postID" })
    .sort("-cratedAt")
    .lean();
};
const DeleteCommentById = (id) => {
  return Comment.findByIdAndDelete(id);
};
const CreateNewComment=(content,parentId,userId,postId)=>{
  return Comment.create({
    Content: content,
    ParentID: parentId,
    commenter: userId,
    postID: postId,
  });
}
const PopulateComment=(comment)=>{
  return Comment.populate(comment, { path: "commenter", select: "-password" });
}
module.exports = {
  DeletePostComments,
  FindCommentById,
  FindPostComments,
  UpdateCommentContent,
  FindUserComments,
  DeleteCommentById,
  CreateNewComment,PopulateComment
};
