import {
    FormControl,
    Input,
    FormLabel
  } from "@mui/material";
  import { useField } from "formik";
  import React, { useEffect } from "react";
  
  export const InputField = ({
    size: _,
    ...props
  }) => {
    const { errorText, ...rest } = props;
    const [field, meta] = useField(props);
    // console.log('field', field)

    return (
    <FormControl>
        <FormLabel label={props.label}>{props.label}</FormLabel>
        <Input
          {...rest}
          {...field}
          // id={field.name}
          placeholder=""
          border="1px"
          width="100%"
        />
      </FormControl>
    );
  };
  