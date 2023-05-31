import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button from '../button/button';
import Input from '../input/Input'

import axios from 'axios';

const MovieGrid = props => {

    const [items, setItems] = useState([]);

    
    // const { keyword } = useParams();

    useEffect(() => {
        axios.get(`https://cinema-00wj.onrender.com/movies/`)
        .then((response) => {
          setItems(response.data.filter(movie => {
            return movie.status == props.status;
          }));
          console.log("Movie List : ", response.data.filter(movie => {
            return movie.status == props.status;
          }), "status", props.status);
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu từ API:', error);
        });
    }, [props.status]);


    return (
        <>
             {/* <div className="section mb-3">
                <MovieSearch status={props.status} keyword={keyword}/>
            </div>  */}
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard item={item} key={i}/>)
                }
            </div>
            
        </>
    );
}

//  const MovieSearch = props => {

//      const history = useHistory();

//      const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

//      const goToSearch = useCallback(
//          () => {
//              if (keyword.trim().length > 0) {
//                  history.push(`/${props.status}/search/${keyword}`);
//              }
//          },
//          [keyword, props.status, history]
//      );

//      useEffect(() => {
//          const enterEvent = (e) => {
//              e.preventDefault();
//              if (e.keyCode === 13) {
//                  goToSearch();
//              }
//          }
//          document.addEventListener('keyup', enterEvent);
//          return () => {
//              document.removeEventListener('keyup', enterEvent);
//          };
//      }, [keyword, goToSearch]);

//      return (
//          <div className="movie-search">
//              <Input
//                  type="text"
//                  placeholder="Enter keyword"
//                  value={keyword}
//                  onChange={(e) => setKeyword(e.target.value)}
//              />
//              <Button className="small" onClick={goToSearch}>Search</Button>
//          </div>
//      )
//  }

export default MovieGrid;