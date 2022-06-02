import { gql } from "@apollo/client";

export const DISCOVER_MOVIES = gql`
  query DiscoverMovies($genres: [ID!]!) {
    discoverMovies(filter: { withGenres: { include: $genres } }) {
      id
      name
      overview
      releaseDate
      score
      socialMedia {
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
  }
`;
