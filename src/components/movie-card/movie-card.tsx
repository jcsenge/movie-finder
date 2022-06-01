import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Slide,
} from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  DiscoverMoviesQuery,
  SearchMoviesQuery,
} from "../../generated/graphql";

export const PLACEHOLDER_IMAGE_URL =
  "https://via.placeholder.com/400x500/424242/969696.png?text=No+Poster+Image";

export type MovieData =
  | SearchMoviesQuery["searchMovies"][number]
  | DiscoverMoviesQuery["discoverMovies"][number];

export interface MovieCardProps {
  movieData: MovieData;
  onMovieTitleClick: () => void;
}

export const MovieCard: FC<MovieCardProps> = ({
  movieData,
  onMovieTitleClick,
}) => {
  const { t } = useTranslation();

  return (
    <Grid item sx={{ minWidth: 200 }}>
      <Slide direction="right" in={true}>
        <Card id="movie-card">
          <CardMedia
            component="img"
            height="300"
            alt={t("movie_poster_alt")}
            image={movieData.poster?.huge ?? PLACEHOLDER_IMAGE_URL}
          />
          <CardContent id="movie-title-button">
            <Button onClick={onMovieTitleClick}>{movieData.name}</Button>
          </CardContent>
        </Card>
      </Slide>
    </Grid>
  );
};
