import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { MoviesContainer } from "../../components/movies-container/movies-container";
import { SearchInput } from "../../components/search-input/search-input";

export interface FindMoviesProps { }

export const FindMovies: FC<FindMoviesProps> = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = React.useState("");
    return (
        <Grid container direction="column" padding={4}>
            <Grid item>
                <Typography variant="h1" fontSize="2.5rem" align="center" marginY={8}>
                    {t("hello")}
                </Typography>
            </Grid>
            <SearchInput setSearchTerm={setSearchTerm} />
            <MoviesContainer searchTerm={searchTerm} />
        </Grid >
    );
};
