// This component is used at the beginning of the exercise as a skeleton example
// We'll replace this component with one that uses GraphQL to fetch movies

import React from "react";
import { Item } from "semantic-ui-react";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import Movie from "./Movie";
import { Component } from "react";

const GET_MOVIES = gql`
  query MovieListQuery($title: String!) {
    movies: moviesByTitle(subString: $title, first: 10) {
      title
      movieId
      imdbRating
      plot
      poster
      year
      genres
      similar {
        movieId
        poster
        title
      }
    }
  }
`;

class MovieList extends Component {
  render = () => {
    return (
      <Query query={GET_MOVIES} variables={{ title: this.props.title }}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return "Loading...";
          if (error) return `${error}`;

          return (
            <Item.Group divided>
              {data.movies.map(movie => (
                <Movie
                  key={movie.movieId}
                  title={movie.title}
                  poster={movie.poster}
                  plot={movie.plot}
                  rating={movie.imdbRating}
                  genres={movie.genres}
                  similar={movie.similar}
                  year={movie.year}
                />
              ))}
            </Item.Group>
          );
        }}
      </Query>
    );
  };
}

export default MovieList;
