import React from "react";
import Logo from "../logo.png";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Error from "../small.jpg";
import Gendres from "../helpers/Gendres";
const SearchMovies = async (query = "") => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  return data;
};

const Navbar = () => {
  const [show, setShow] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const myRef = React.useRef(null);
  const history = useHistory();

  const results = useQuery(
    ["SearchMovie", { type: "done" }, query],
    () => SearchMovies(query),
    {
      keepPreviousData: false,
      enabled: !!query,
    }
  );

  const { data, isSuccess } = useQuery("getGenres", () =>
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    ).then((res) => res.json())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?q=${query}`);
  };

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        myRef.current.classList.add("bg-soft");
      } else {
        myRef.current.classList.remove(...["bg-soft"]);
      }
    };
  }, []);

  return (
    <nav
      ref={myRef}
      className="flex sticky top-0 z-10 items-center justify-between flex-wrap py-4 lg:px-12"
    >
      <div className="flex items-center justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 lg:pb-0">
        <div className="w-1/4 lg:w-full flex item-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-32" />
          </Link>
        </div>
        <form
          className="absolute right-12 lg:right-0  mr-4 text-gray-600 block w-1/2 lg:w-1/4"
          onSubmit={handleSearch}
        >
          <input
            className="border-2 border-gray-600 bg-transparent h-10 pl-2 pr-8 w-full px-3 rounded-lg text-sm placeholder-gray-300 placeholder-opacity-20 focus:outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="absolute right-0 top-0 mt-3 mr-2 focus:outline-none"
          >
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ enableBackground: "new 0 0 56.966 56.966" }}
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </form>
        <div className="block lg:hidden ">
          <button
            id="nav"
            className="flex items-center px-3 py-2 border-2 rounded text-gray-200 border-gray-200"
            onClick={() => setShow((state) => !state)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      {/* search movie */}
      {query ? (
        <>
          {results.isLoading ? (
            <div className="bg-soft p-3 absolute z-40 top-0 mt-16 w-1/4 right-4 text-white text-center">
              <h1>loading</h1>
            </div>
          ) : (
            <div className="bg-soft p-3 absolute z-40 top-0 mt-16 w-1/4 right-4">
              {results.isSuccess &&
                results.data.results.splice(0, 5).map((val, i) => (
                  <Link
                    to={`/movie/${val.id}`}
                    key={i}
                    onClick={() => setQuery("")}
                  >
                    <div className="flex flex-wrap">
                      <div className="w-1/6 mb-5" key={i}>
                        <img
                          onError={(e) => {
                            e.target.src = Error;
                          }}
                          src={`https://image.tmdb.org/t/p/w45${val.poster_path}`}
                          alt={val.title}
                        />
                      </div>
                      <div className="w-5/6 ">
                        <p className="text-xs text-white">{val.title}</p>
                        <Gendres
                          css="text-red-500 font-normal"
                          id={val.genre_ids}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              <Link to={`/search?q=${query}`} onClick={() => setQuery("")}>
                <div className="bg-red-500 text-center text-white p-2 w-full">
                  Load More
                </div>
              </Link>
            </div>
          )}
        </>
      ) : null}

      <div
        className={` w-full lg:flex flex-grow lg:items-center lg:w-auto lg:px-3 px-8 font-light ${
          show ? "block" : "hidden"
        }`}
      >
        <div className="text-sm text-gray-400 lg:flex-grow font-normal">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 mr-2"
            onClick={() => setShow(false)}
          >
            Home
          </Link>
          <div className="dropdown-toggle inline-block relative px-4 py-2 mr-2">
            <button className="inline-flex font-normal justify-center focus:outline-none hover:text-white">
              Gendre
              <svg
                className="-mr-1 ml-2 h-5 w-5 font-normal"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="dropdown-menu absolute rounded-md shadow-lg bg-dark ring-1 ring-black ring-opacity-5 focus:outline-none py-1 w-full flex-wrap">
              {isSuccess &&
                data.genres.map((g, i) => (
                  <div
                    key={i}
                    className="w-1/2 lg:w-1/3 py-2 px-4 text-xs hover:text-red-500"
                  >
                    <Link
                      to={`/gendre/${g.id}/${g.name}`}
                      className="mt-4 lg:mt-0 py-2 mr-2"
                      onClick={() => setShow((state) => !state)}
                    >
                      {g.name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
