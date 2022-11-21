import { Stack, Typography } from "@mui/material";
import { FRadioGroup } from "../../components/form";

export const SORT_BY_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "highestBidAsc", label: "Highest Bid: Low to High" },
  { value: "highestBidDesc", label: "Highest Bid: High to Low" },
  { value: "averageBidAsc", label: "Average Bid: High to Low" },
  { value: "averageBidDesc", label: "Average Bid: High to Low" },
];

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
  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "column" }}
      justifyContent="center"
      alignItems={{ xs: "center", md: "stretch" }}
      spacing={{ xs: 3, sm: 7, md: 3 }}
      sx={{
        backgroundColor: "#FFF",
        borderRadius: "1px solid black",
        boxShadow: 1,
        mb: { xs: 5 },
        p: 3,
        width: { sm: "80%", lg: 250 },
      }}
    >
      <Stack direction="column" spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filter By Industry
        </Typography>
        <FRadioGroup
          name="industry"
          defaultValue="All"
          direction="column"
          options={FILTER_INDUSTRY_OPTIONS}
          sx={{ width: 2, display: "flex", flexDirection: "column" }}
        />
      </Stack>
    </Stack>
  );
}

export default JobFilter;
