import { useQuery } from "react-query";
const Gendres = ({ id }) => {
  const { data, isLoading } = useQuery("genres", () =>
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    ).then((res) => res.json())
  );
  if (isLoading) return null;

  const result = data.genres
    .filter((e) => id.find((i) => e.id === i))
    .map((val) => val.name)
    .join(", ");
  return (
    <div className="flex text-white text-xs font-light mt-2">
      <p className="mr-1">Genres :</p>
      <p>{result}</p>
    </div>
  );
};
export default Gendres;
