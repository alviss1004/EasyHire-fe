import { Alert, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormProvider, FTextField } from "../../components/form";
import FRating from "../../components/form/FRating";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import { createReview } from "./reviewSlice";

const ReviewSchema = Yup.object().shape({
  rating: Yup.number().required("Rating is required"),
});

function ReviewForm({ callback, jobId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    rating: null,
    comment: "",
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(createReview({ ...data, jobId }));
      navigate(`/jobs/${jobId}`);
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          width: { xs: "90%", sm: 600 },
          padding: "40px",
          borderRadius: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Please rate your satisfaction on the job
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} alignItems="center">
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}
            <FRating
              name="rating"
              precision={0.5}
              sx={{ fontSize: { xs: 40, sm: 50 } }}
            />
            <FTextField
              name="comment"
              label="Comment"
              placeholder="Comment (optional)"
              multiline
              fullWidth
              rows={5}
            />
            <LoadingButton
              type="submit"
              size="large"
              variant="contained"
              loading={isSubmitting}
              fullWidth
            >
              Submit
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Modal>
  );
}

export default ReviewForm;
