import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";

import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "../../components/movie-list/MovieList";
import axios from "axios";

import Button from "../../components/button/Button";

const Detail = () => {
  console.log("details page");

  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    console.log(id);
    const getDetail = async () => {
      const response = await tmdbApi.detail(id);

      setItem(response);

      window.scrollTo(0, 0);
      console.log(response);
    };
    getDetail();
  }, [id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{ backgroundImage: `url(${item.banner_image})` }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{ backgroundImage: `url(${item.cover_image})` }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.name}</h1>
              <div className="genres">
                {item.tags &&
                  item.tags.slice(0, 5).map((tag, i) => (
                    <span key={i} className="genres__item">
                      {tag.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.description}</p>
              <div className="moreinfo">
                <div>
                  <span> Xếp hạng </span>
                  <br></br>
                  <strong className="mg-left">{item.rating} </strong>
                </div>
                <div>
                  <span> Khởi chiếu </span>
                  <br></br>
                  <strong> {item.release_date} </strong>
                </div>
                <div>
                  <span> Thời lượng</span>
                  <br></br>
                  <strong className="mg-left"> {item.duration_minute}</strong>
                </div>
                <div>
                  <span> Giới hạn tuổi</span>
                  <br></br>
                  <strong className="mg-left_age"> {item.age_limit} </strong>
                </div>
              </div>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                {/* <CastList id={item.id}/>   */}
                <div className="casts">
                  {item.casts &&
                    item.casts.map((cast, i) => (
                      <div key={i} className="cats__item">
                        <div
                          className="casts__item__img"
                          style={{ backgroundImage: `url(${cast.image_path})` }}
                        ></div>
                        <p className="casts__item__name">{cast.name}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              {/* <VideoList id={item.id}/> */}
              <iframe
                src={`https://www.youtube.com/embed/${item.trailer_id}`}
                width="640"
                height="480"
              ></iframe>
            </div>
            <div className="m-4">
              <div className="">
                <div className="container mx-auto text-center text-2xl w-fit border-b-2 border-b-red-600 p-6 hover:bg-red-600 hover:border-b-white">
                  <p className="font-extrabold">Đánh giá</p>
                </div>
              </div>
              <div className="mt-8 w-2/3 mx-auto">
                <div className="mb-4">
                  <input
                    className="block w-full h-20 p-4 m-2 bg-black rounded-xl border-2 border-red-600 caret-red-600 hover:border-4"
                    placeholder="Viết ghi chú"
                  ></input>
                  <input
                    className="w-1/3 inline h-8 p-4 m-2 bg-black rounded-xl border-2 border-red-600"
                    placeholder="Biệt danh"
                  ></input>
                  <input
                    className="w-1/3 inline h-8 p-4 m-2 bg-black rounded-xl border-2 border-red-600"
                    placeholder="Email"
                  ></input>
                  <div className="inline m-2">
                    <Button className="small">Đánh giá</Button>
                  </div>
                </div>
                <div>Review</div>
                <div>Review</div>
                <div>Review</div>
                <div>Review</div>
                <div>Review</div>
              </div>
            </div>
          </div>
          {/* <div className='section mb-3'>
                         <div className='section__header mb-2'>
                             <h2>Similar</h2>

                         </div>
                         <MovieList category={category} type="similar"  id={item.id}/>

                     </div>  */}
        </>
      )}
    </>
  );
};

export default Detail;
