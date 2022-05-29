
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { useSearchMoviesQuery } from "../../generated/graphql";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/400x500/424242/969696.png?text=No+Poster+Image";

export interface MoviesContainerProps {
    searchTerm: string;
}

export const MoviesContainer: FC<MoviesContainerProps> = ({ searchTerm }) => {
    const { loading, error, data } = useSearchMoviesQuery({ variables: { query: searchTerm } });
    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error :</p>;

    return (
        <Grid item container justifyContent="center" alignItems="center" columns={{ xs: 4, md: 6 }} spacing={2} marginY={4}>
            {data && data.searchMovies.map((movie) => (
                <Grid item sx={{ minWidth: 200 }} key={movie.id}>
                    <Card>
                        <CardMedia component="img" height="300" alt="movieImage" image={movie.poster?.huge ?? PLACEHOLDER_IMAGE_URL} />
                        <CardContent>
                            <Typography fontSize={18} textAlign="center">
                                {movie.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
