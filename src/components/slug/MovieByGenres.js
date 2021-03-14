import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Pagination from "../../helpers/Pagination";
import Error from "../../Error.png";
async function fetchPagination(page, id) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_genres=${id}`
  );
  return data;
}

const MovieByGenres = () => {
  const [activePage, setActivePage] = React.useState(1);
  let { id, gendre } = useParams();

  const { data, isLoading } = useQuery(
    ["ByGenres", activePage, id],
    () => fetchPagination(activePage, id),
    { keepPreviousData: true }
  );
  const handlePageChange = React.useCallback((pageNumber) => {
    setActivePage(pageNumber);
  }, []);

  if (isLoading)
    return <h1 className="text-white text-center text-4xl mt-10">Loading</h1>;

  return (
    <div className="mb-10 container mx-auto mt-24">
      <h1 className="text-white text-center text-red-500 text-4xl font-bold my-10 uppercase">
        {gendre}
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {data.results.map((g, i) => (
          <div key={i} className="relative rounded overflow-hidden movie-card">
            <img
              onError={(e) => {
                e.target.src = Error;
              }}
              src={`https://image.tmdb.org/t/p/w500${g.poster_path}`}
              alt={g.title}
              style={{ width: "100%", height: "366px" }}
            />

            <Link to={`/movie/${g.id}`}>
              <div className="card-overflow">
                <h4 className="w-full absolute top-2/4 text-gray-300 text-center font-semibold">
                  <i className="fas fa-play mb-5 text-4xl" />
                  <p>{g.title}</p>
                </h4>
              </div>
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
  );
};

export default MovieByGenres;
