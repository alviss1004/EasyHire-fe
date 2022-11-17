import { useFormContext, Controller } from "react-hook-form";
import { Select } from "@mui/material";

function FSelect({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </Select>
      )}
    />
  );
}

export default FSelect;
