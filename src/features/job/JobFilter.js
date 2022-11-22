import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

export const FILTER_INDUSTRY_OPTIONS = [
  "All",
  "Arts & Entertainment",
  "Accommodation & Food Services",
  "Architecture & Design",
  "Business & Finance",
  "Educational Services",
  "Engineering",
  "Healthcare & Social Assistance",
  "Manufacturing",
  "Music & Audio",
  "Programming & Technology",
];

function JobFilter({ resetFilter }) {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <Stack
      justifyContent="center"
      alignItems={{ xs: "center", md: "stretch" }}
      spacing={{ xs: 3, sm: 7, md: 3 }}
      sx={{
        backgroundColor: "#FFF",
        borderRadius: "1px solid black",
        boxShadow: 1,
        mb: { xs: 5 },
        p: 3,
        width: { sm: "80%", md: 250 },
      }}
    >
      <Stack direction="column" spacing={1}>
        <FormControl>
          <Typography sx={{ fontWeight: 600, fontSize: 20, mb: 2 }}>
            Filter By Industry
          </Typography>
          <RadioGroup
            name="industry-radio-group"
            row
            defaultValue="All"
            value={searchParams.get("industry") || ""}
            onChange={(event) => {
              let industry = event.target.value;
              if (industry) {
                setSearchParams({ industry });
              } else {
                setSearchParams({});
              }
            }}
          >
            {FILTER_INDUSTRY_OPTIONS.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option.charAt(0).toUpperCase() + option.slice(1)}
                sx={{ mb: 1 }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default JobFilter;
