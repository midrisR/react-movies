import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Pagination from "../helpers/Pagination";
import Error from "../Error.png";

async function fetchPagination(page) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );
  return data;
}

const TopRated = () => {
  const [activePage, setActivePage] = React.useState(1);

  const { data, isLoading } = useQuery(
    ["top-rated", activePage],
    () => fetchPagination(activePage),
    { keepPreviousData: true }
  );
  const handlePageChange = React.useCallback((pageNumber) => {
    setActivePage(pageNumber);
  }, []);

  if (isLoading)
    return <h1 className="text-white text-center text-4xl mt-10">Loading</h1>;

  return (
    <div className="mb-10">
      <div className="grid grid-cols-4 lg:grid-cols-10 gap-4">
        {data.results.map((popular, i) => (
          <div key={i} className="rounded overflow-hidden">
            <img
              onError={(e) => {
                e.target.src = Error;
              }}
              src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
              alt={popular.title}
              style={{ width: "100%", height: "166px" }}
            />
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

export default TopRated;
