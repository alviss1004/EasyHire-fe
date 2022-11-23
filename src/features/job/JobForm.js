import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormProvider, FSelect, FTextField } from "../../components/form";
import { useNavigate } from "react-router-dom";
import { Alert, alpha } from "@mui/material";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { createJob } from "./jobSlice";

const JobPostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  industry: Yup.string().required("Industry is required"),
  description: Yup.string().required("Description is required"),
});

const defaultValues = {
  title: "",
  industry: "Arts & Entertainment",
  description: "",
};

const industries = [
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

function JobForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(JobPostSchema),
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
      const jobData = await dispatch(createJob(data));
      navigate(`/jobs/${jobData.job._id}`);
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.responseError && (
        <Alert severity="error">{errors.responseError.message}</Alert>
      )}
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ width: "75%" }}
        >
          <FTextField name="title" label="Title" />
          <FSelect name="industry" helperText="Please select industry">
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </FSelect>
        </Stack>
        <FTextField
          name="description"
          label="Description"
          multiline
          fullWidth
          rows={10}
          sx={{
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: alpha("#919EAB", 0.32),
            },
          }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            alignSelf: { xs: "center", md: "end" },
            width: "20%",
            minWidth: 200,
            backgroundColor: "#E53838",
            ":hover": {
              filter: "brightness(120%)",
              backgroundColor: "#E53838",
            },
          }}
        >
          Submit Post
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default JobForm;
