import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from "@mui/icons-material/Paid";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteJob, getJobById } from "../features/job/jobSlice";
import { capitalCase } from "change-case";
import JobDetailInfo from "../features/job/JobDetailInfo";
import JobDetailBids from "../features/job/JobDetailBids";
import useAuth from "../hooks/useAuth";
import { Stack } from "@mui/system";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import EditPostForm from "../features/job/EditPostForm";
import LoadingScreen from "../components/misc/LoadingScreen";

function JobDetailPage() {
  const [currentTab, setCurrentTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { selectedJob, isLoading } = useSelector(
    (state) => state.job,
    shallowEqual
  );

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteJob = async (jobId) => {
    await dispatch(deleteJob(jobId));
    navigate("/jobs");
  };

  useEffect(() => {
    if (jobId) dispatch(getJobById(jobId));
  }, [dispatch, jobId]);

  const JOBDETAIL_TABS = [
    {
      value: "info",
      icon: <InfoIcon sx={{ fontSize: 30 }} />,
      component: <JobDetailInfo job={selectedJob} loading={isLoading} />,
    },
    {
      value: "bids",
      icon: <PaidIcon sx={{ fontSize: 30 }} />,
      component: <JobDetailBids bids={selectedJob?.bids} loading={isLoading} />,
    },
  ];

  return (
    <>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{ mb: 3, mt: 12, ml: "13%" }}
      >
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/jobs"
        >
          Jobs
        </Link>
        <Typography>{selectedJob?.title}</Typography>
      </Breadcrumbs>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container
          sx={{
            backgroundColor: "#FFF",
            minWidth: "75vw",
            maxWidth: "75vw",
            boxShadow: 1,
            p: 1.5,
          }}
        >
          <Helmet>
            <style>{"body { background-color: #F0F3F5; }"}</style>
          </Helmet>
          {isEditing ? (
            selectedJob && (
              <EditPostForm job={selectedJob} toggleEdit={toggleEdit} />
            )
          ) : user._id === selectedJob?.lister._id ? (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Tabs
                  value={currentTab}
                  scrollButtons="auto"
                  variant="scrollable"
                  allowScrollButtonsMobile
                  onChange={(e, value) => setCurrentTab(value)}
                  sx={{ mb: 2 }}
                >
                  {JOBDETAIL_TABS.map((tab) => (
                    <Tab
                      disableRipple
                      key={tab.value}
                      label={capitalCase(tab.value)}
                      icon={tab.icon}
                      value={tab.value}
                    />
                  ))}
                </Tabs>
                {selectedJob?.status === "bidding" ? (
                  <Stack direction="row">
                    <IconButton
                      aria-label="delete"
                      color="inherit"
                      onClick={toggleEdit}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="inherit"
                      onClick={handleClickOpen}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="deleteJob-dialog"
                    >
                      <DialogTitle id="deleteJob-dialog">
                        {"Delete confirmation"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Are you sure you want to delete this job?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          autoFocus
                          onClick={handleClose}
                          sx={{ color: "#F22C35", fontWeight: 600 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            handleDeleteJob(selectedJob._id);
                            handleClose();
                          }}
                          autoFocus
                          sx={{ fontWeight: 600 }}
                        >
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Stack>
                ) : null}
              </Stack>
              <Divider />
              {JOBDETAIL_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return (
                  isMatched && (
                    <Box key={tab.value} sx={{ mt: 2 }}>
                      {tab.component}
                    </Box>
                  )
                );
              })}
            </>
          ) : (
            <JobDetailInfo job={selectedJob} />
          )}
        </Container>
      )}
    </>
  );
}

export default JobDetailPage;
