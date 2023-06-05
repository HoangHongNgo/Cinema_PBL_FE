import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";

import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "../../components/movie-list/MovieList";
import axios from "axios";

import Button, { OutlineButton } from "../../components/button/Button";

const Detail = () => {
  console.log("details page");

  const { id } = useParams();

  let history = useHistory();

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

  const [note, setNote] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here with the form data (note, nickname, email)
    console.log("Form submitted:", note, nickname, email);
    setSub(true);
  };

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{ backgroundImage: `url(${item.banner_image})` }}
          ></div>
          <div className="movie-content container">
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
                  <span> Rating </span>
                  <br></br>
                  <strong className="mg-left">{item.rating} </strong>
                </div>
                <div>
                  <span> Debut </span>
                  <br></br>
                  <strong> {item.release_date} </strong>
                </div>
                <div>
                  <span> Duration </span>
                  <br></br>
                  <strong className="mg-left"> {item.duration_minute}</strong>
                </div>
                <div>
                  <span> Age Limit </span>
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
          <div className="container flex justify-center mb-10">
            <Button
              onClick={() => {
                history.push(
                  "/buyticket/?city=3&cinema=1&date=2023-05-30&movie=" + item.id
                );
                console.log(
                  "/buyticket/?city=3&cinema=1&date=2023-05-30&movie=" + item.id
                );
              }}
              className="large"
            >
              Mua vé ngay !
            </Button>
          </div>
          <div className="container my-3">
            <div className="section">
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
                  <p className="font-extrabold">Đánh giá phim</p>
                </div>
              </div>
              <div className="my-8 w-2/3 mx-auto">
                <div className="mb-8">
                  <input
                    className="block w-full h-20 p-4 m-2 bg-black rounded-xl border-2 border-red-600 caret-red-600 hover:border-4"
                    value={note}
                    onChange={handleNoteChange}
                    placeholder="Viết ghi chú"
                  ></input>
                  <input
                    className="w-1/3 inline h-8 p-4 m-2 bg-black rounded-xl border-2 border-red-600"
                    value={nickname}
                    onChange={handleNicknameChange}
                    placeholder="Biệt danh"
                  ></input>
                  <input
                    className="w-1/3 inline h-8 p-4 m-2 bg-black rounded-xl border-2 border-red-600"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  ></input>
                  <div className="inline m-2">
                    <Button className="small" onClick={handleSubmit}>
                      Gửi
                    </Button>
                  </div>
                </div>
                {sub ? (
                  <div className="my-6">
                    <div className="my-2 w-full border-b-2 border-red-600 hover:border-white hover:bg-red-600 pl-1">
                      <div className="font-bold">{nickname}</div>
                    </div>
                    <div className="my-2">
                      <div>
                        <p className="text-sm">{note}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-end mt-2">
                        <OutlineButton className="extrasmall mx-1">
                          Like
                        </OutlineButton>
                        <OutlineButton className="extrasmall mx-1">
                          Disl
                        </OutlineButton>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="my-6">
                  <div className="my-2 w-full border-b-2 border-red-600 hover:border-white hover:bg-red-600 pl-1">
                    <div className="font-bold">Ng. H. Hoang</div>
                  </div>
                  <div className="my-2">
                    <div>
                      <p className="text-sm">
                        I watched it for like 30-40 minutes before I gave up, it
                        looks like straight to video movie with lame completely
                        unrealistic action scenes and cliche dialogues, pretty
                        much unwatchable. I was going into it hoping I will
                        enjoy dumb action flick, but man oh man, they made them
                        in 80s/90s or even later way better, even the movements
                        while fighting seemed like slow motion and not sure what
                        was it about covering yourself against gunfire with
                        hands, are you going to stop bullet with your hands?
                        Completely ridiculous movie, gave it 50%/2.5 and I feel
                        very generous, you are better off watching Rambo or
                        whatever Cage movies from 90s than this trash. Even my
                        wife who likes dumb movies was rolling her eyes at those
                        action scenes.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end mt-2">
                      <OutlineButton className="extrasmall mx-1">
                        Like
                      </OutlineButton>
                      <OutlineButton className="extrasmall mx-1">
                        Disl
                      </OutlineButton>
                    </div>
                  </div>
                </div>
                <div className="my-6">
                  <div className="my-2 w-full border-b-2 border-red-600 hover:border-white hover:bg-red-600 pl-1">
                    <div className="font-bold">H. Ph. Le</div>
                  </div>
                  <div className="my-2">
                    <div>
                      <p className="text-sm">
                        Repetitive action scenes with basically the same
                        choreography only in different locations are boring.
                        Personally I liked the second movie more because it had
                        variations, the action was better choreographed and its
                        pace was a bit slower so it was much clearer what is
                        going on. In Chapter 4 there were some nice scenes, I
                        liked the car fighting and the view from the top in the
                        house shootout. But overall the movie felt boring, it
                        was hard for me to keep interest, especially with such
                        nonsensical story.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end mt-2">
                      <OutlineButton className="extrasmall mx-1">
                        Like
                      </OutlineButton>
                      <OutlineButton className="extrasmall mx-1">
                        Disl
                      </OutlineButton>
                    </div>
                  </div>
                </div>
                <div className="my-6">
                  <div className="my-2 w-full border-b-2 border-red-600 hover:border-white hover:bg-red-600 pl-1">
                    <div className="font-bold">L. V. H. Duc</div>
                  </div>
                  <div className="my-2">
                    <div>
                      <p className="text-sm">
                        The Raid 2 is much better both with action and as a
                        movie in general. Gareth Evans is not your average
                        "direct to video" director, he actually knows how to
                        build a scene and has very good sense of cinema as art.
                        Not surprising he is now working on big productions.
                        Highly recommended for action aficionados.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end mt-2">
                      <OutlineButton className="extrasmall mx-1">
                        Like
                      </OutlineButton>
                      <OutlineButton className="extrasmall mx-1">
                        Disl
                      </OutlineButton>
                    </div>
                  </div>
                </div>
                <div className="my-6">
                  <div className="my-2 w-full border-b-2 border-red-600 hover:border-white hover:bg-red-600 pl-1">
                    <div className="font-bold">Ng. Th. Liem</div>
                  </div>
                  <div className="my-2">
                    <div>
                      <p className="text-sm">
                        The Chinese dont like black people. We know that from
                        how Disney markets to them. As for this **** film it
                        made $185 million world wide. I heard the production
                        cost was around $250 million but that dosent include the
                        marketing. Which is usually 1.5x the production budget.
                        So in this case it can be as high as $375 million if not
                        more. So to break even they would have to make $625/$700
                        million depending on the marketing. Also you cant trust
                        site like Rotten Tomatoes since they delete negative
                        reviews. They consider any criticism towards films with
                        lead women/minorities as review bombing. Cause you know,
                        a film cant suck due to poor writing, acting, and
                        horrible CGI.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end mt-2">
                      <OutlineButton className="extrasmall mx-1">
                        Like
                      </OutlineButton>
                      <OutlineButton className="extrasmall mx-1">
                        Disl
                      </OutlineButton>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center mt-2">
                  <OutlineButton className="small">Xem thêm</OutlineButton>
                </div>
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
