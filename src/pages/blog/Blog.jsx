import React from "react";
import PageHeader from "../../components/page-header/PageHeader";
import Input from "../../components/input/InputBase";
import Button, { OutlineButton } from "../../components/button/Button";
import Blog_Post from "./Blog_Post";

import "./blog.scss";

const Blog = () => {
  console.log("blog page");
  return (
    <div>
      <PageHeader>Blog Phim</PageHeader>
      <div className="flex flex-row justify-between">
        <div className="w-1/5"></div>
        <div className="w-2/3">
          <div className="bg-neutral-800 rounded-xl flex flex-col justify-center w-full my-6 p-4 hover:scale-105">
            <div className="m-5">
              <div className="w-full">
                <div className="">
                  <Input
                    className="w-full h-12"
                    placeholder="Bạn đang nghĩ gì ..."
                  ></Input>
                </div>
              </div>
              <div className="flex justify-start mt-4">
                <Button className="small mx-2 ml-0">Đăng</Button>
                <OutlineButton className="small mx-2">Tệp</OutlineButton>
                <OutlineButton className="small mx-2">Hình ảnh</OutlineButton>
              </div>
            </div>
          </div>
          <Blog_Post></Blog_Post>
        </div>

        <div className="w-1/5"></div>
      </div>
    </div>
  );
};

export default Blog;
