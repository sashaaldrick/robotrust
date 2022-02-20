import {
    FormControl,
    Input,
    FormLabel,
    Typography
  } from "@mui/material";
  import { useField } from "formik";
  import React from "react";
  
  export const InputField = ({
    size: _,
    ...props
  }) => {
    const { errorText, ...rest } = props;
    const [field, meta] = useField(props);

    return (
    <FormControl>
      <FormLabel style={{ fontSize: '1.5rem' }} className="gradient__text">{props.label}</FormLabel>
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
  