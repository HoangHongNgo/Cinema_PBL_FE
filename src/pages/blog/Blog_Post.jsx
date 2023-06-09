import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog_Post = (props) => {
  const text = props.blog.content ? props.blog.content : "";

  console.log("Blog : ", props.blog);

  const words = text.split(" ");
  const [viewMore, setViewMore] = useState(false);

  const viewMoreClick = () => {
    setViewMore(!viewMore);
  };
  return (
    <div className="bg-neutral-800 rounded-xl flex flex-col justify-center w-full my-6 p-4">
      <div className="m-5">
        <div className="border-b-2 border-zinc-600">
          <Link>{props.blog.author.name}</Link>
        </div>
        <div className="mt-4">
          {words.length >= 100 && viewMore === false ? (
            <div>
              <p>{text.split(" ").slice(0, 100).join(" ")}</p>
              <a className="text-red-700" onClick={viewMoreClick}>
                Xem thêm
              </a>
            </div>
          ) : (
            <div>
              <p>{text}</p>
              <a className="text-red-700" onClick={viewMoreClick}>
                Ẩn bớt
              </a>
            </div>
          )}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Blog_Post;
