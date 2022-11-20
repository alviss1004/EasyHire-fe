import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "../../components/form";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
];

export const FILTER_INDUSTRY_OPTIONS = ["All", "Art", "Technology", "Music"];

export const FILTER_SKILL_OPTIONS = ["All", "HTML", "CSS", "React"];

export const FILTER_HIGHESTBID_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

function JobFilter({ resetFilter }) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        borderRadius: "1px solid black",
        boxShadow: 1,
        mb: { xs: 5 },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row", md: "column" }}
        alignItems={{ sm: "center", md: "stretch" }}
        spacing={{ xs: 3, sm: 7, md: 3 }}
        sx={{ p: 3, width: { sm: "80%", lg: 250 } }}
      >
        <Stack direction="column" spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Industry
          </Typography>
          <FRadioGroup
            name="industry"
            options={FILTER_INDUSTRY_OPTIONS}
            sx={{ width: 2 }}
          />
        </Stack>
        <Divider
          variant="middle"
          sx={{
            borderBottomWidth: 1,
            backgroundColor: "rgba(152, 152, 152 ,0.4)",
          }}
        />
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Skill
          </Typography>
          <FRadioGroup
            name="skill"
            options={FILTER_SKILL_OPTIONS}
            row={false}
          />
        </Stack>
        <Divider
          variant="middle"
          sx={{
            borderBottomWidth: 1,
            backgroundColor: "rgba(152, 152, 152 ,0.4)",
          }}
        />
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Highest Bid
          </Typography>
          <FRadioGroup
            name="highestBidRange"
            options={FILTER_HIGHESTBID_OPTIONS.map((item) => item.value)}
            getOptionLabel={FILTER_HIGHESTBID_OPTIONS.map((item) => item.label)}
          />
        </Stack>

        <Box>
          <Button size="large" color="inherit" variant="outlined">
            Clear All
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default JobFilter;
