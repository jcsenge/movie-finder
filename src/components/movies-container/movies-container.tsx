import { Grid } from "@mui/material";
import React, { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  useDiscoverMoviesLazyQuery,
  useSearchMoviesLazyQuery,
} from "../../generated/graphql";
import { InformationBox } from "../information-box/information-box";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { MovieCard, MovieData } from "../movie-card/movie-card";

const NUMBER_OF_GENRES_TO_INCLUDE = 3;

export interface MoviesContainerProps {
  searchTerm?: string;
  selectedMovieToSearchRelated?: MovieData;
  setSelectedMovie: (selected: MovieData | undefined) => void;
}

export const MoviesContainer: FC<MoviesContainerProps> = ({
  searchTerm,
  selectedMovieToSearchRelated,
  setSelectedMovie,
}) => {
  const { t } = useTranslation();
  const [
    discoverMovies,
    {
      data: discoveredData,
      loading: discoveredLoading,
      error: discoveredError,
    },
  ] = useDiscoverMoviesLazyQuery();
  const [
    searchMovies,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useSearchMoviesLazyQuery();
  const genreIDs = useMemo<string[]>(() => {
    if (selectedMovieToSearchRelated) {
      const genres = selectedMovieToSearchRelated.genres.map(
        (genreElem) => genreElem.id
      );
      return genres.slice(0, NUMBER_OF_GENRES_TO_INCLUDE);
    }
    return [];
  }, [selectedMovieToSearchRelated]);

  const movies = useMemo(() => {
    if (searchTerm && searchTerm.length > 0) {
      return searchData?.searchMovies ?? [];
    }
    if (selectedMovieToSearchRelated) {
      return discoveredData?.discoverMovies ?? [];
    }
    return [];
  }, [
    discoveredData?.discoverMovies,
    searchData,
    searchTerm,
    selectedMovieToSearchRelated,
  ]);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      searchMovies({ variables: { query: searchTerm } });
    }
    if (selectedMovieToSearchRelated) {
      discoverMovies({ variables: { genres: genreIDs } });
    }
  }, [
    genreIDs,
    discoverMovies,
    searchMovies,
    searchTerm,
    selectedMovieToSearchRelated,
  ]);

  if (discoveredLoading || searchLoading) {
    return <LoadingSpinner />;
  }

  if (discoveredError) {
    return <InformationBox text={`${t("error")}${discoveredError.message}`} />;
  }

  if (searchError) {
    return <InformationBox text={`${t("error")}${searchError.message}`} />;
  }

  if ((!searchTerm || searchTerm.length < 1) && !selectedMovieToSearchRelated) {
    return <InformationBox text={t("search_for_a_movie")} />;
  }

  if (movies.length === 0) {
    return <InformationBox text={t("sorry_no_results")} />;
  }

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      columns={{ xs: 4, md: 6 }}
      spacing={2}
      marginY={4}
    >
      {movies &&
        movies.map((movieData: MovieData) => (
          <MovieCard
            onMovieTitleClick={() => setSelectedMovie(movieData)}
            key={movieData.id}
            movieData={movieData}
          />
        ))}
    </Grid>
  );
};
