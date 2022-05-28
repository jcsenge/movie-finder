import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { FC } from "react";

export const MoviesContainer: FC = () => {
    return (
        <Grid item container justifyContent="center" alignItems="center" columns={{ xs: 4, md: 6 }} spacing={2} marginY={4}>
            {[1, 2, 3, 4, 6].map((movie) => (
                <Grid item sx={{ minWidth: 200 }} key={movie}>
                    <Card >
                        <CardMedia component="img" height="300" alt="movieImage" image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/neMZH82Stu91d3iqvLdNQfqPPyl.jpg`} />
                        <CardContent>
                            <Typography fontSize={18} textAlign="center">
                                The Lost City
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

        </Grid>
    );
};
