import React, { useState, useEffect } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import Input from "../../components/input/InputBase";
import Button, { OutlineButton } from "../../components/button/Button";
import Blog_Post from "./Blog_Post";
import axios from "axios";

import "./blog.scss";

const Blog = () => {
  console.log("blog page");
  const [content, setContent] = useState("");
  const [blogList, setBlogList] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      content: content,
      author: localStorage.getItem("username"),
    };
    // Send a POST request using Axios
    axios
      .post("https://cinema-00wj.onrender.com/blogs/post", blogData)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  useEffect(() => {
    // Lấy dữ liệu từ API bằng Axios
    axios
      .get(`https://cinema-00wj.onrender.com/blogs/`)
      .then((response) => {
        setBlogList(response.data);
        console.log("blogs : ", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, []);
  return (
    <div>
      <PageHeader>Blog Phim</PageHeader>
      <div className="flex flex-row justify-between">
        <div className="w-1/5"></div>
        <div className="w-2/3">
          <div className="bg-neutral-800 rounded-xl flex flex-col justify-center w-full my-6 p-4 hover:scale-105">
            <form onSubmit={handleSubmit}>
              <div className="m-5">
                <div className="w-full">
                  <div className="">
                    <Input
                      className="w-full h-12"
                      placeholder="Bạn đang nghĩ gì ..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div className="flex justify-start mt-4">
                  <Button type="submit" className="small mx-2 ml-0">
                    Đăng
                  </Button>
                  <OutlineButton className="small mx-2">Tệp</OutlineButton>
                  <OutlineButton className="small mx-2">Hình ảnh</OutlineButton>
                </div>
              </div>
            </form>
          </div>
          {blogList?.map((item) => (
            <Blog_Post blog={item}></Blog_Post>
          ))}
        </div>

        <div className="w-1/5"></div>
      </div>
    </div>
  );
};

export default Blog;
