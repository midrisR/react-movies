import { useQuery } from "react-query";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "./components/ImageSlide";
import PopularMovies from "./components/PopularMovies";
import TopRated from "./components/TopRated";
import Footer from "./components/Footer";
function App() {
  const { isLoading, data } = useQuery("comming soon", () =>
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json())
  );

  if (isLoading) return null;

  return (
    <div className="App">
      <Splide
        options={{
          arrows: false,
          autoplay: true,
          interval: 3000,
        }}
      >
        {data.results.splice(0, 10).map((val, i) => (
          <SplideSlide key={i}>
            <Image
              image={`https://image.tmdb.org/t/p/original${val.backdrop_path}`}
              id={val.id}
              title={val.title}
              overview={val.overview}
              genres={val.genre_ids}
            />
          </SplideSlide>
        ))}
      </Splide>
      <div className="container mx-auto px-4 my-20">
        <div className="mb-4">
          <h3 className="text-sm font-light text-gray-100 mb-2">
            Popular Movies
          </h3>
          <PopularMovies />
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-light text-gray-100 mb-2">
            Top Rate Movies
          </h3>
          <TopRated />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
