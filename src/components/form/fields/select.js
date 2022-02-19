import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from "@mui/material";
import { useField } from "formik";
import React from "react";

const termInYears = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
]

export const SelectField = ({
size: _,
...props
}) => {
    const { errorText, ...rest } = props;
    const [field, meta] = useField(props);

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{field.name}</InputLabel>
            <Select
                {...rest}
                {...field}
                id={field.name}
            >
                {termInYears.map((year) => (
                    <MenuItem value={year}>{year}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
  