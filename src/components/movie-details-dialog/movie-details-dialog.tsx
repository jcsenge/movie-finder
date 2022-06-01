import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { SearchMoviesQuery } from "../../generated/graphql";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { MovieData } from "../movie-card/movie-card";
import { MovieDialogDetails } from "./partials/movie-dialog-details";
import { MovieDialogTitle } from "./partials/movie-dialog-title";
import { MovieDialogActions } from "./partials/movie-dialog-actions";

const WIKIPEDIA_SEARCH_URL =
  "https://en.wikipedia.org/w/api.php?origin=%2A&format=json&action=query&prop=extracts&explaintext=1&titles=";
const WIKIPEDIA_SEARCH_FORMAT = "&utf8=&format=json";

export interface WikiPage {
  title: string;
  extract: string;
  pageid: number;
}

export interface MovieDetailsDialogProps {
  isOpen: boolean;
  movieData: SearchMoviesQuery["searchMovies"][number];
  handleSearchRelated: (searchRelated: MovieData) => void;
  handleClose: () => void;
}

export const MovieDetailsDialog: FC<MovieDetailsDialogProps> = ({
  movieData,
  isOpen,
  handleSearchRelated,
  handleClose,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [wikiPage, setWikiPage] = useState<WikiPage>();

  useEffect(() => {
    fetch(
      `${WIKIPEDIA_SEARCH_URL}${movieData.name.replace(
        " ",
        "_"
      )}${WIKIPEDIA_SEARCH_FORMAT}`
    )
      .then((res) => res.json())
      .then((data) => {
        const wikiPages = Object.values(data.query.pages) as WikiPage[];
        setIsLoaded(true);
        setWikiPage({
          ...wikiPages[0],
          extract: wikiPages[0]?.extract.split("==")[0],
        });
      });
  }, [movieData.name]);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <Dialog open={isOpen}>
      <MovieDialogTitle name={movieData.name} score={movieData.score} />
      <DialogContent>
        <MovieDialogDetails wikiPage={wikiPage} movieData={movieData} />
        <DialogActions>
          <MovieDialogActions
            handleClose={handleClose}
            handleSearchRelated={handleSearchRelated}
            wikiPage={wikiPage}
            movieData={movieData}
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
