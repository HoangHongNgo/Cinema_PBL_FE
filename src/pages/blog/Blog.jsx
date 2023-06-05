import React from "react";
import PageHeader from "../../components/page-header/PageHeader";
import Input from "../../components/input/InputBase";
import Button, { OutlineButton } from "../../components/button/Button";

import "./blog.scss";

const Blog = () => {
  console.log("blog page");
  return (
    <div>
      <PageHeader></PageHeader>
      <div className="flex flex-row justify-between">
        <div className="w-1/5"></div>
        <div className="w-2/3">
          <div className="bg-neutral-900 rounded-xl flex flex-col justify-center w-full my-6 p-4 hover:scale-105">
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
          <div className="bg-neutral-900 rounded-xl flex flex-col justify-center w-full my-6 p-4">
            <div className="m-5">
              <div className="border-b-2 border-zinc-600">
                <p>Ng. H. Hoang</p>
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="w-1/5"></div>
      </div>
    </div>
  );
};

export default Blog;
