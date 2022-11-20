import { Pagination, Stack } from "@mui/material";
import FreelancerCard from "./FreelancerListCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFreelancers } from "./userSlice";
import { FREELANCERS_PER_PAGE } from "../../app/config";
import LoadingScreen from "../../components/misc/LoadingScreen";

function FreelancerList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const {
    freelancersById,
    currentPageFreelancers,
    totalFreelancers,
    totalPages,
    isLoading,
  } = useSelector((state) => state.user);

  const freelancers = currentPageFreelancers.map(
    (freelancerId) => freelancersById[freelancerId]
  );

  useEffect(() => {
    dispatch(getFreelancers({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="flex-end"
            mb={2}
            sx={{ width: { md: "90%" } }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            {freelancers.map((freelancer) => (
              <FreelancerCard key={freelancer._id} freelancer={freelancer} />
            ))}
          </Stack>
        </>
      )}
    </>
  );
}

export default FreelancerList;
