import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Rating, Typography } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchMoviesQuery } from "../../generated/graphql";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { MovieData, PLACEHOLDER_IMAGE_URL } from "../movie-card/movie-card";
import imdbLogo from "../../../src/resources/img/imdb-logo.png";

const WIKIPEDIA_PAGE_BY_ID_URL = "https://en.wikipedia.org/wiki?curid="
const WIKIPEDIA_SEARCH_URL = "https://en.wikipedia.org/w/api.php?origin=%2A&format=json&action=query&prop=extracts&explaintext=1&titles=";
const WIKIPEDIA_SEARCH_FORMAT = "&utf8=&format=json";
interface WikiPage {
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

export const MovieDetailsDialog: FC<MovieDetailsDialogProps> = ({ movieData, isOpen, handleSearchRelated, handleClose }) => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [wikiPage, setWikiPage] = useState<WikiPage>();

    useEffect(() => {
        fetch(`${WIKIPEDIA_SEARCH_URL}${movieData.name.replace(" ", "_")}${WIKIPEDIA_SEARCH_FORMAT}`)
            .then(res => res.json())
            .then(
                (data) => {
                    const wikiPages = Object.values(data.query.pages) as WikiPage[];
                    setIsLoaded(true);
                    setWikiPage({ ...wikiPages[0], extract: wikiPages[0]?.extract.split("==")[0] });
                },
                (error) => {
                    setIsLoaded(true);
                }
            )
    }, [movieData.name])

    const openUrlInNewTab = useCallback((url: string) => {
        if (wikiPage) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }, [wikiPage]);

    if (!isLoaded) {
        return <LoadingSpinner />
    }

    return (
        <Dialog
            open={isOpen}
        >
            <DialogTitle fontSize={20} display="flex" justifyContent="space-between">
                <Box>{movieData.name}</Box>
                <Rating readOnly value={movieData.score / 2.0} precision={0.5} />
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} display="flex" flexDirection="row">
                        <img height="300" width="200" alt="movieImage" src={movieData.poster?.huge ?? PLACEHOLDER_IMAGE_URL} />
                    </Grid>
                    <Grid item xs={12} sm={7} maxHeight={400} overflow="auto">
                        {movieData.overview}
                    </Grid>
                </Grid>
                <Box fontSize={16} display="flex" >
                    <Grid container spacing={2} marginY={2} display="flex">
                        <Grid item xs={4} md={2}>
                            {t("genre")}:
                        </Grid>
                        <Grid item xs={7} md={10} display="flex">
                            {movieData.genres.map((genre, index) => (<Box key={index}>{genre.name}{index < movieData.genres.length - 1 && ","}</Box>))}
                        </Grid>
                        <Grid item xs={4} md={2}>
                            {t("released")}:
                        </Grid>
                        <Grid item xs={7} md={10}>
                            {new Date(movieData.releaseDate).toLocaleDateString()}
                        </Grid>
                        {wikiPage?.extract &&
                            <Grid item xs={12}>
                                <Box fontWeight="bold">
                                    {t("information_from_wikipedia")}:
                                </Box>
                                {wikiPage.extract}
                            </Grid>}
                    </Grid>
                </Box>
                <DialogActions>
                    <Button onClick={() => handleSearchRelated(movieData)} variant="outlined">{t("search_related")}</Button>
                    <IconButton disabled={!movieData.socialMedia?.imdb} disableRipple size="small" onClick={() => { openUrlInNewTab(movieData?.socialMedia?.imdb) }}>
                        <img width={30} height={30} src={imdbLogo} alt="IMDB logo" />
                    </IconButton>
                    <Button
                        disabled={!wikiPage?.pageid}
                        onClick={() => openUrlInNewTab(`${WIKIPEDIA_PAGE_BY_ID_URL}${wikiPage?.pageid}`)}>
                        {t("open_wikipedia")}
                    </Button>
                    <Button onClick={handleClose}>{t("close")}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog >
    );
};
