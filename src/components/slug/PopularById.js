import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "../ImageSlide";
import SimiliarMovies from "../SimiliarMovies";
import Video from "../video";

const FetchByID = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  return data;
};

const PopularById = () => {
  const { id } = useParams();
  const [play, setPlay] = React.useState(false);
  const { data, isLoading } = useQuery(["FetchByID", id], () => FetchByID(id));
  const credit = useQuery("credit", () =>
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    ).then((res) => res.json())
  );

  const handlePlay = React.useCallback(() => {
    setPlay((old) => !old);
  }, []);

  if (isLoading) return null;

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <Image
            image={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          />
          <i
            className="w-full absolute text-center top-1/3 far fa-play-circle text-6xl text-white text-opacity-50 hover:text-opacity-80 cursor-pointer"
            onClick={handlePlay}
          />
        </div>
        <div className="bg-overflow p-10 relative w-full -top-60 -mt-1 flex flex-wrap justify-center">
          <div className="w-full sm:w-2/6 lg:w-1/6">
            <img
              className="rounded-lg mb-6 lg:mb-0"
              src={`https://image.tmdb.org/t/p/w200${data.poster_path}`}
              alt={data.title}
            />
          </div>
          <div className="w-full sm:w-4/6 lg:w-4/6 text-gray-400 mb-18">
            <div className="lg:ml-8">
              <h1 className="text-3xl font-bold">{data.title}</h1>
              <p className="text-sm mt-2 ">{data.overview}</p>
              <div className="text-gray-400 text-sm mt-4">
                <div className="mt-2 lg:mt-">
                  <div className="mt-1 block lg:flex">
                    <span className="mr-1">Genres :</span>
                    <span className="text-red-500">
                      {data.genres.map((val) => val.name).join(" / ")}
                    </span>
                  </div>
                  <div className="mt-1 block lg:flex">
                    <span className="mr-1">languages :</span>
                    <span className="text-red-500">
                      {data.spoken_languages
                        .map((val) => val.english_name)
                        .join(" / ")}
                    </span>
                  </div>
                  <div className="mt-1 text-sm block lg:flex items-center">
                    <span className="mr-1">vote :</span>
                    <i className="fas fa-star text-yellow-400 mr-1 text-xs" />
                    <p className="text-red-500">{data.vote_average}</p>
                  </div>
                  <div className="mt-1">
                    <span className="mr-1">Cast : </span>
                    <span className="text-red-500 text-sm">
                      {credit.isSuccess && (
                        <>
                          {credit.data.cast.map((val) => val.name).join(", ")}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24 px-6">
            <SimiliarMovies id={id} />
          </div>
        </div>
        <Video id={id} play={play} onPlay={handlePlay} />
      </div>
    </>
  );
};

export default PopularById;
