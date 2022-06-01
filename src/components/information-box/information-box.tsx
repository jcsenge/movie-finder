import { Box } from "@mui/material";
import React, { FC } from "react";

export interface InformationBoxProps {
    text: string;
}

export const InformationBox: FC<InformationBoxProps> = ({ text }) => {
    return (
        <Box display="flex" justifyContent="center" marginY={8}>{text}</Box>
    );
};
