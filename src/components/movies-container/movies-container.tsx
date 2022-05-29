
import { Grid } from "@mui/material";
import React, { FC, useState } from "react";
import { SearchMoviesQuery, useSearchMoviesQuery } from "../../generated/graphql";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { MovieDetailsDialog } from "../movie-details-dialog/movie-details-dialog";
import { MovieCard } from "../movie-card/movie-card";

export interface MoviesContainerProps {
    searchTerm: string;
}

export const MoviesContainer: FC<MoviesContainerProps> = ({ searchTerm }) => {
    const { loading, error, data } = useSearchMoviesQuery({ variables: { query: searchTerm } });

    const [selectedMovie, setSelectedMovie] = useState<SearchMoviesQuery["searchMovies"][number]>();

    if (loading) {
        return <LoadingSpinner />;
    }
    if (searchTerm.length < 1) {
        return <>Search for a movie...</>
    }
    if (error) {
        return <p>Error :</p>;
    }
    return (
        <Grid item container justifyContent="center" alignItems="center" columns={{ xs: 4, md: 6 }} spacing={2} marginY={4}>
            {data && data.searchMovies.map((movieData: SearchMoviesQuery["searchMovies"][number]) => (
                <MovieCard onMovieTitleClick={() => setSelectedMovie(movieData)} key={movieData.id} movieData={movieData} />
            ))}
            {selectedMovie && <MovieDetailsDialog movieData={selectedMovie} isOpen={selectedMovie !== undefined} handleClose={() => setSelectedMovie(undefined)} />}
        </Grid>
    );
};
