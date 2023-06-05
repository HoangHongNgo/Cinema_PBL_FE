import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog_Post = () => {
  const text = `Woody equal ask saw sir weeks aware decay. Entrance prospect removing we packages strictly is no smallest he. For hopes may chief get hours day rooms. Oh no turned behind polite piqued enough at. Forbade few through inquiry blushes you. Cousin no itself eldest it in dinner latter missed no. Boisterous estimating interested collecting get conviction friendship say boy. Him mrs shy article smiling respect opinion excited. Welcomed humoured rejoiced peculiar to in an.

  Pleased him another was settled for. Moreover end horrible endeavor entrance any families. Income appear extent on of thrown in admire. Stanhill on we if vicinity material in. Saw him smallest you provided ecstatic supplied. Garret wanted expect remain as mr. Covered parlors concern we express in visited to do. Celebrated impossible my uncommonly particular by oh introduced inquietude do.
  
  Sudden she seeing garret far regard. By hardly it direct if pretty up regret. Ability thought enquire settled prudent you sir. Or easy knew sold on well come year. Something consulted age extremely end procuring. Collecting preference he inquietude projection me in by. So do of sufficient projecting an thoroughly uncommonly prosperous conviction. Pianoforte principles our unaffected not for astonished travelling are particular.`;

  const words = text.split(" ");
  const [viewMore, setViewMore] = useState(false);

  const viewMoreClick = () => {
    setViewMore(true);
  };
  return (
    <div className="bg-neutral-800 rounded-xl flex flex-col justify-center w-full my-6 p-4">
      <div className="m-5">
        <div className="border-b-2 border-zinc-600">
          <Link>Ng. H. Hoang</Link>
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
            <p>{text}</p>
          )}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Blog_Post;
