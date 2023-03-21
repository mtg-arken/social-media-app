import React from "react";
import { AiFillLike } from "react-icons/ai";

export function LikeButton({ Style,Count }) {
  return (
    <button className={Style}>
      <AiFillLike size={28} />
      {Count}
    </button>
  );
}
