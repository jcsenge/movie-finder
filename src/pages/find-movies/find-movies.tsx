import { Box, Chip, Grid, Typography } from "@mui/material";
import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { MoviesContainer } from "../../components/movies-container/movies-container";
import { MovieData } from "../../components/movie-card/movie-card";
import { MovieDetailsDialog } from "../../components/movie-details-dialog/movie-details-dialog";
import { SearchInput } from "../../components/search-input/search-input";

export const FindMovies: FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovieToSearchRelated, setSelectedMovieToSearchRelated] =
    useState<MovieData>();
  const [selectedMovie, setSelectedMovie] = useState<MovieData>();

  const handleSearchRelated = useCallback((movieData: MovieData) => {
    setSelectedMovieToSearchRelated(movieData);
    setSelectedMovie(undefined);
    setSearchTerm("");
  }, []);

  return (
    <Grid container direction="column" padding={4}>
      <Grid item>
        <Typography variant="h1" fontSize="2.5rem" align="center" marginY={8}>
          {t("hello")}
        </Typography>
      </Grid>
      {!selectedMovieToSearchRelated ? (
        <SearchInput setSearchTerm={setSearchTerm} />
      ) : (
        <Box paddingX={4} width="100%" display="flex" justifyContent="center">
          <Chip
            label={`${t("related_to")}${selectedMovieToSearchRelated.name}`}
            onDelete={() => setSelectedMovieToSearchRelated(undefined)}
          />
        </Box>
      )}
      <MoviesContainer
        searchTerm={searchTerm}
        setSelectedMovie={setSelectedMovie}
        selectedMovieToSearchRelated={selectedMovieToSearchRelated}
      />
      {selectedMovie && (
        <MovieDetailsDialog
          handleSearchRelated={handleSearchRelated}
          movieData={selectedMovie}
          isOpen={
            selectedMovie !== undefined ||
            selectedMovieToSearchRelated !== undefined
          }
          handleClose={() => setSelectedMovie(undefined)}
        />
      )}
    </Grid>
  );
};
