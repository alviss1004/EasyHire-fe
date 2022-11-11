import { Stack } from "@mui/material";
import FreelancerCard from "./FreelancerListCard";

function FreelancerList({ freelancers, loading }) {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      {freelancers.map((freelancer) => (
        <FreelancerCard key={freelancer.userId} freelancer={freelancer} />
      ))}
    </Stack>
  );
}

export default FreelancerList;
