import React from "react";
import { movies, tv } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: {
            isMovie,
            id,
            posterPhoto,
            backgroundPhoto,
            title,
            voteAvg,
            overview
          }
        }
      }
    } = props;
    this.state = {
      isMovie,
      id,
      posterPhoto,
      backgroundPhoto,
      title,
      voteAvg,
      overview,
      loading: true
    };
  }

  async componentDidMount() {
    const { isMovie, id } = this.state;
    let error, genres, overview, status, date, backgroundPhoto;
    try {
      if (isMovie) {
        ({
          genres,
          overview,
          status,
          release_date: date,
          backdrop_path: backgroundPhoto
        } = await movies.getMovie(id));
      } else {
        ({
          genres,
          overview,
          status,
          first_air_date: date,
          backdrop_path: backgroundPhoto
        } = await tv.getShow(id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState(prev => {
        return {
          ...prev,
          loading: false,
          genres,
          backgroundPhoto,
          overview,
          status,
          date
        };
      });
    }
  }

  render() {
    const {
      id,
      posterPhoto,
      backgroundPhoto,
      title,
      voteAvg,
      overview,
      loading
    } = this.state;
    return (
      <DetailPresenter
        id={id}
        posterPhoto={posterPhoto}
        backgroundPhoto={backgroundPhoto}
        title={title}
        voteAvg={voteAvg}
        overview={overview}
        loading={loading}
      />
    );
  }
}