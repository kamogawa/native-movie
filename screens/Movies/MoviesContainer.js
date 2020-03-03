import React from "react";
import MoviesPresenter from "./MoviesPresenter";
import { movies } from "../../src/api";

export default class extends React.Component {
  state = {
    loading: true,
    upcoming: null,
    popular: null,
    nowPlaying: null,
    error: null
  };

  async componentDidMount() {
    let upcoming, popular, nowPlaying, error;
    try {
      ({
        data: { results: upcoming }
      } = await movies.getUpcoming());
      ({
        data: { results: popular }
      } = await movies.getPopular());
      ({
        data: { results: nowPlaying }
      } = await movies.getNowPlaying());
      console.log(upcoming);
    } catch (error) {
      console.log(error);
      error = "Can't get Movies.";
    } finally {
      this.setState({
        loading: false,
        error,
        upcoming,
        popular,
        nowPlaying
      });
    }
  }

  render() {
    const { loading, upcoming, popular, nowPlaying } = this.state;
    return (
      <MoviesPresenter
        upcoming={upcoming}
        popular={popular}
        loading={loading}
        nowPlaying={nowPlaying}
      />
    );
  }
}