import React, {useState, useEffect} from "react";

import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const CastList= props => {

    
    console.log("cast list");
    const [casts,setCasts]=useState([]);

    useEffect(()=>{
        const getCredits=async()=>{
            const res= await tmdbApi.credits(props.id);
            setCasts(res.slice(0, 5));
            console.log(res);
        }
        getCredits();
    },[props.id]);
    return(
        <div className="casts">
            {
                casts.map((cast,i)=>(
                    <div key={i} className="cats__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${cast.image_path})`}}></div>
                        <p className="casts__item__name">{cast.name}</p>

                    </div>
                ))
            }

        </div>
    )
}

export default CastList;