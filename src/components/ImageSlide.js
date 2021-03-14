import Gendres from "../helpers/Gendres";
import { useHistory, useLocation } from "react-router-dom";
const Image = ({ image, title, overview, genres, popularity, id }) => {
  let history = useHistory();
  const location = useLocation();

  const hanldeClick = () => {
    history.push(`/movie/${id}`);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top,  rgba(30,33,41,1) 5%, rgba(30,33,41,0) 45%), url(${image})`,
        height: "600px",
        backgroundSize: "cover",
        position: "relative",
        backgroundPosition: "center",
      }}
    >
      <div className="px-4 absolute w-full lg:w-1/3 bottom-24">
        <p className="font-semibold text-xl text-white mb-2">{title}</p>
        <p className="font-light text-sm text-white">{overview}</p>
        {genres !== undefined ? <Gendres id={genres} /> : ""}
        {location.pathname === "/" ? (
          <button
            className="bg-gray-300 bg-opacity-20 text-gray-400 px-3 py-2 mt-3 rounded focus:outline-none"
            onClick={hanldeClick}
          >
            Watch Now
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default Image;
