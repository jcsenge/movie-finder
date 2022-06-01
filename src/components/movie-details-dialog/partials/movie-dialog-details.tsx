import { Box, Grid } from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { MovieData, PLACEHOLDER_IMAGE_URL } from "../../movie-card/movie-card";
import { WikiPage } from "../movie-details-dialog";

export interface MovieDialogDetailsProps {
  movieData: MovieData;
  wikiPage?: WikiPage;
}

export const MovieDialogDetails: FC<MovieDialogDetailsProps> = ({
  movieData,
  wikiPage,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} display="flex" flexDirection="row">
          <img
            height="300"
            width="200"
            alt="movieImage"
            src={movieData.poster?.huge ?? PLACEHOLDER_IMAGE_URL}
          />
        </Grid>
        <Grid item xs={12} sm={7} maxHeight={400} overflow="auto">
          {movieData.overview}
        </Grid>
      </Grid>
      <Box fontSize={16} display="flex">
        <Grid container spacing={2} marginY={2} display="flex">
          <Grid item xs={4} md={2}>
            {t("genre")}:
          </Grid>
          <Grid item xs={7} md={10} display="flex">
            {movieData.genres.map((genre, index) => {
              return `${genre.name}${
                index < movieData.genres.length - 1 ? ", " : " "
              }`;
            })}
          </Grid>
          <Grid item xs={4} md={2}>
            {t("released")}:
          </Grid>
          <Grid item xs={7} md={10}>
            {new Date(movieData.releaseDate).toLocaleDateString()}
          </Grid>
          {wikiPage?.extract && (
            <Grid item xs={12}>
              <Box fontWeight="bold">{t("information_from_wikipedia")}:</Box>
              {wikiPage.extract}
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};
