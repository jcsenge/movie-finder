import { Box, DialogTitle, Rating } from "@mui/material";
import React, { FC } from "react";

export interface MovieDialogTitleProps {
    name: string;
    score: number;
}

export const MovieDialogTitle: FC<MovieDialogTitleProps> = ({ name, score }) => {

    return (
        <DialogTitle fontSize={20} display="flex" justifyContent="space-between">
            <Box>{name}</Box>
            <Rating readOnly value={score / 2.0} precision={0.5} />
        </DialogTitle>
    );
};
