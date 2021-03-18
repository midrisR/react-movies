import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import PopularById from "./components/slug/PopularById";
import MovieByGenres from "./components/slug/MovieByGenres";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Footer from "./components/Footer";
export default function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/movie/:id" component={PopularById} />
        <Route path="/gendre/:id/:gendre" component={MovieByGenres} />
        <Route path="/search" component={Search} />
      </Switch>
      <Footer />
    </Router>
  );
}
