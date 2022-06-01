import { Button, IconButton } from "@mui/material";
import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MovieData } from "../../movie-card/movie-card";
import { WikiPage } from "../movie-details-dialog";
import imdbLogo from "../../../resources/img/imdb-logo.png";

const WIKIPEDIA_PAGE_BY_ID_URL = "https://en.wikipedia.org/wiki?curid="

export interface MovieDialogActionsProps {
    wikiPage?: WikiPage;
    movieData: MovieData;
    handleClose: () => void;
    handleSearchRelated: (searchRelated: MovieData) => void;
}

export const MovieDialogActions: FC<MovieDialogActionsProps> = ({ wikiPage, movieData, handleClose, handleSearchRelated }) => {
    const { t } = useTranslation();

    const openUrlInNewTab = useCallback((url: string) => {
        if (wikiPage) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }, [wikiPage]);

    return (
        <>
            <Button onClick={() => handleSearchRelated(movieData)} variant="outlined">{t("search_related")}</Button>
            <IconButton disabled={!movieData.socialMedia?.imdb} disableRipple size="small" onClick={() => { openUrlInNewTab(movieData?.socialMedia?.imdb) }}>
                <img width={30} height={30} src={imdbLogo} alt={t("imdb_alt_text")} />
            </IconButton>
            <Button
                disabled={!wikiPage?.pageid}
                onClick={() => openUrlInNewTab(`${WIKIPEDIA_PAGE_BY_ID_URL}${wikiPage?.pageid}`)}>
                {t("open_wikipedia")}
            </Button>
            <Button onClick={handleClose}>{t("close")}</Button>
        </>
    );
};
