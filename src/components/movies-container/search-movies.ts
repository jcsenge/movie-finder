import { gql } from "@apollo/client";

export const SEARCH_MOVIES = gql`
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
      id
    }
    poster {
      huge
    }
  }
}`;
