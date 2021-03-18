import Logo from "../logo.png";
import { Link } from "react-router-dom";
const Footer = () => (
  <div className="w-full container p-12 py mx-auto">
    <img src={Logo} alt="Logo" className="mx-auto" />
    <div className="text-center flex flex-col text-xs text-gray-300 mt-5 font-ligth">
      <p className="mb-5">Example react js project with TMDB api</p>
      <a
        className="underline mb-3"
        href="https://www.themoviedb.org/documentation/api"
      >
        API Documentation
      </a>
      <a
        className="underline mb-3"
        href="https://github.com/midrisR/react-movies"
      >
        Github
      </a>
    </div>
  </div>
);
export default Footer;
