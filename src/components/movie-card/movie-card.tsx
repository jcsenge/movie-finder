import { Button, Card, CardContent, CardMedia, Grid, Slide } from "@mui/material";
import React, { FC } from "react";
import { SearchMoviesQuery } from "../../generated/graphql";

export const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/400x500/424242/969696.png?text=No+Poster+Image";

export interface MovieCardProps {
    movieData: SearchMoviesQuery["searchMovies"][number];
    onMovieTitleClick: () => void;
}

export const MovieCard: FC<MovieCardProps> = ({ movieData, onMovieTitleClick }) => {

    return (
        <Grid item sx={{ minWidth: 200 }} >
            <Slide direction="right" in={true}>
                <Card>
                    <CardMedia component="img" height="300" alt="movieImage" image={movieData.poster?.huge ?? PLACEHOLDER_IMAGE_URL} />
                    <CardContent>
                        <Button onClick={onMovieTitleClick}>
                            {movieData.name}
                        </Button>
                    </CardContent>
                </Card>
            </Slide>
        </Grid>
    );
};
