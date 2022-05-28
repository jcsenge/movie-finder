import { Button, Grid, TextField } from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

export const SearchInput: FC = () => {
    const { t } = useTranslation();
    
    return (
        <Grid container item direction="row" justifyContent="center" alignItems="center" spacing={2} xs={12} sm={8}>
            <Grid item>
                <TextField size="small" label={t("search_for_movies")} />
            </Grid>
            <Grid item>
                <Button size={"medium"} variant="contained">{t("submit")}</Button>
            </Grid>
        </Grid >
    );
};
