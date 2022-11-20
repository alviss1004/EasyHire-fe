import { useFormContext, Controller } from "react-hook-form";
import { Select } from "@mui/material";

function FSelectbox({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select {...field} fullWidth error={!!error} {...other}>
          {children}
        </Select>
      )}
    />
  );
}

export default FSelectbox;
