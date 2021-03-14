import React from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { useQuery } from "react-query";
import axios from "axios";

const FetchVideo = async (id = 682254) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  return data;
};

const Video = ({ id, play, onPlay }) => {
  const { data, isLoading } = useQuery(["FetchVideo", id], () =>
    FetchVideo(id)
  );
  const player = React.useRef(null);

  const handleClickFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request(player.current.wrapper);
    }
  };

  if (isLoading) return null;

  return (
    <>
      <div
        className={
          play
            ? " fixed top-0 z-20 left-0 bg-black bg-opacity-50 h-full w-full "
            : "hidden"
        }
        onClick={onPlay}
      >
        <p className="text-red-500 text-right m-24 text-sm font-semibold mt-10 cursor-pointer">
          CLOSE
        </p>
        <div className="fixed  top-2/4 left-2/4 w-full lg:w-1/2 transform -translate-x-2/4 -translate-y-2/4 px-3 lg:px-0">
          {data.results.length > 0 ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                data.results.length > 1
                  ? data.results[1].key
                  : data.results[0].key
              }`}
              className="rounded-2xl overflow-hidden"
              width="100%"
              height="355px"
              ref={player}
              controls={true}
              playing={play}
              onPlay={handleClickFullscreen}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
                attributes: { style: { outline: 0 } },
              }}
              style={{ width: "100%" }}
            />
          ) : (
            <h1 className="text-red-500 text-center text-4xl font-black mt-10">
              Video Not Found
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Video;
