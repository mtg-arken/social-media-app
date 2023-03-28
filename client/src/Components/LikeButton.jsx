import React from "react";
import { AiFillLike } from "react-icons/ai";

export function LikeButton({ Style,Count,handleLike}) {
  return (
    <button className={Style} onClick={handleLike}>
      <AiFillLike size={28} />
      {Count}
    </button>
  );
}
