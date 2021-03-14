import Logo from "../logo.png";
import { Link } from "react-router-dom";
const Footer = () => (
  <div className="w-full container p-12 py mx-auto">
    <img src={Logo} alt="Logo" className="mx-auto" />
    <div className="text-center text-xs text-gray-300 mt-5 font-ligth">
      <p className="mb-5">Example react js project with TMDB api</p>
      <Link to="https://www.themoviedb.org/documentation/api">
        API Documentation
      </Link>
    </div>
  </div>
);
export default Footer;
