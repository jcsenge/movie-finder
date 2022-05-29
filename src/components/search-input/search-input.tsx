import { Button, Grid, TextField } from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

export interface SearchInputProps {
    setSearchTerm: (searchTerm: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ setSearchTerm }) => {
    const { t } = useTranslation();
    const [textFieldValue, setTextFieldValue] = React.useState("");
    return (
        <Grid container item direction="row" justifyContent="center" alignItems="center" spacing={2} xs={12} sm={8}>
            <Grid item>
                <TextField value={textFieldValue} onChange={(e) => setTextFieldValue(e.target.value)} size="small" label={t("search_for_movies")} />
            </Grid>
            <Grid item>
                <Button size={"medium"} onClick={() => setSearchTerm(textFieldValue)} variant="contained">{t("submit")}</Button>
            </Grid>
        </Grid >
    );
};
