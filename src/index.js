import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Routes from "./Route";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Routes />
  </QueryClientProvider>,
  document.getElementById("root")
);
