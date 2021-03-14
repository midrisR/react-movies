import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Pagination from "../helpers/Pagination";
import { Link, useLocation } from "react-router-dom";
import Error from "../Error.png";

const SearchMovies = async (query, page) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
  );
  return data;
};

function useParam() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const [activePage, setActivePage] = React.useState(1);
  let q = useParam();
  const query = q.get("q");

  const { data, isLoading, error } = useQuery(
    ["Search", query, activePage],
    () => SearchMovies(query, activePage),
    { keepPreviousData: true }
  );

  const handlePageChange = React.useCallback((pageNumber) => {
    setActivePage(pageNumber);
  }, []);

  if (isLoading || error)
    return (
      <h1 className="text-red-500 text-center text-4xl mt-10">
        {error ? "Movies Not Found" : "Loading"}
      </h1>
    );

  return (
    <>
      {data.results.length < 1 ? (
        <h1 className="text-red-500 text-center text-4xl mt-10">
          Movies Not Found
        </h1>
      ) : (
        <div className="mb-10 px-12">
          <h1 className="text-red-500 mb-10 text-center text-2xl mt-10">
            Hasil Pencarian {query}
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {data.results.map((s, i) => (
              <div key={i} className="rounded overflow-hidden">
                <Link to={`movie/${s.id}`}>
                  <img
                    onError={(e) => {
                      e.target.src = Error;
                    }}
                    src={`https://image.tmdb.org/t/p/w500${s.poster_path}`}
                    alt={s.title}
                  />
                </Link>
              </div>
            ))}
          </div>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={Math.ceil(data.total_results / data.total_pages)}
            totalItemsCount={data.total_results}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default Search;
