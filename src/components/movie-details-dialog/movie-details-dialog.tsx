import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Rating, Typography } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchMoviesQuery } from "../../generated/graphql";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { PLACEHOLDER_IMAGE_URL } from "../movie-card/movie-card";
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
    handleClose: () => void;
}

export const MovieDetailsDialog: FC<MovieDetailsDialogProps> = ({ movieData, isOpen, handleClose }) => {
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
                    console.log(error);

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
            <DialogTitle display="flex" justifyContent="space-between">
                <Typography fontSize={20}>{movieData.name}</Typography>
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
                <DialogContentText fontSize={16} display="flex" >
                    <Grid container spacing={2} marginY={2} display="flex">
                        <Grid item xs={2}>
                            {t("genre")}:
                        </Grid>
                        <Grid item xs={10} display="flex">
                            {movieData.genres.map((genre, index) => (<Typography key={index}>{genre.name}{index < movieData.genres.length - 1 && ","}</Typography>))}
                        </Grid>
                        <Grid item xs={2}>
                            {t("released")}:
                        </Grid>
                        <Grid item xs={10}>
                            {new Date(movieData.releaseDate).toLocaleDateString()}
                        </Grid>
                        {wikiPage?.extract &&
                            <Grid item xs={12}>
                                <Typography fontWeight="bold">
                                    {t("information_from_wikipedia")}:
                                </Typography>
                                {wikiPage.extract}
                            </Grid>}
                    </Grid>
                </DialogContentText>
                <DialogActions>
                    <IconButton disabled={!movieData.socialMedia?.imdb} disableRipple size="small" onClick={() => { openUrlInNewTab(movieData?.socialMedia?.imdb) }}>
                        <img width={30} height={30} src={imdbLogo} alt="IMDB logo"></img>
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
