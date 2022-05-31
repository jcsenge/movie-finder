import { Button, Grid, TextField } from "@mui/material";
import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

export interface SearchInputProps {
    setSearchTerm: (searchTerm: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ setSearchTerm }) => {
    const { t } = useTranslation();
    const [textFieldValue, setTextFieldValue] = React.useState("");
    const handleSubmit = useCallback(() => {
        setSearchTerm(textFieldValue);
    }, [setSearchTerm, textFieldValue])

    return (
        <Grid container item direction="row" justifyContent="center" alignItems="center" spacing={2} xs={12} sm={8}>
            <Grid item>
                <TextField value={textFieldValue} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit();
                    }
                }} onChange={(e) => setTextFieldValue(e.target.value)} size="small" label={t("search_for_movies")} />
            </Grid>
            <Grid item>
                <Button disabled={textFieldValue.length === 0} size={"medium"} onClick={handleSubmit} variant="contained">{t("submit")}</Button>
            </Grid>
        </Grid >
    );
};
