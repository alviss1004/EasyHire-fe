import { useFormContext, Controller } from "react-hook-form";
import { Rating } from "@mui/material";

function FRating({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Rating {...field} {...other} />
      )}
    />
  );
}

export default FRating;
