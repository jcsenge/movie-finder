import { gql } from "@apollo/client";

export const MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
    id
    name
    overview
    releaseDate
    score
    socialMedia{
      imdb
    }
    genres {
      name
    }
    poster {
      huge
    }
  }
}`;
