// components/CustomInput.jsx
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";

const CustomInput = ({
  label,
  name,
  type = "text",
  icon: Icon,
  endAdornment,
  register,
  rules,
  error,
  helperText,
  InputLabelProps,
  ...props
}) => {
  return (
    <TextField
      label={label}
      fullWidth
      type={type}
      error={!!error}
      helperText={helperText}
      InputProps={{
        startAdornment: Icon && (
          <InputAdornment position="start">
            <Icon />
          </InputAdornment>
        ),
        endAdornment,
      }}
      InputLabelProps={InputLabelProps}
      {...register(name, rules)}
      sx={{
        mb: 3,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      }}
      {...props}
    />
  );
};

export default CustomInput;
