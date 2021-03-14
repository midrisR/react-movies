import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../helpers/Pagination";
import Error from "../Error.png";
const FetchSimiliar = async (id, page) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );
  return data;
};
const SimiliarMovies = ({ id }) => {
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading } = useQuery(
    ["FetchSimiliar", activePage],
    () => FetchSimiliar(id, activePage),
    { keepPreviousData: true }
  );

  const handlePageChange = useCallback((pageNumber) => {
    setActivePage(pageNumber);
  }, []);

  if (isLoading) return null;

  return (
    <div className="mb-10">
      <div className="text-lg font-semibold mb-4 text-red-500">
        YOU MAY ALSO LIKE
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-10 gap-4">
        {data.results.map((similiar, i) => (
          <div key={i} className="rounded overflow-hidden">
            <Link to={`/movie/${similiar.id}`}>
              <img
                onError={(e) => {
                  e.target.src = Error;
                }}
                src={`https://image.tmdb.org/t/p/w500${similiar.poster_path}`}
                alt={similiar.title}
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
  );
};

export default SimiliarMovies;
