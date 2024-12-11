import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  icon,
  error,
}) => (
  <TextField
    name={name}
    label={label}
    type={type}
    value={value}
    onChange={onChange}
    fullWidth
    variant="outlined"
    InputProps={{
      startAdornment: icon && (
        <InputAdornment position="start">{icon}</InputAdornment>
      ),
      style: { color: "#e0e1dd" }, // Optional styling
    }}
    InputLabelProps={{
      style: { color: "#9fb3c8" }, // Optional styling
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#415a77" },
        "&:hover fieldset": { borderColor: "#1b998b" },
        "&.Mui-focused fieldset": { borderColor: "#1b998b" },
      },
    }}
    error={Boolean(error)}
    helperText={error}
  />
);

export default InputField;
