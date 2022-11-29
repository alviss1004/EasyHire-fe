import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FormProvider,
  FSelect,
  FTextField,
  FUploadImage,
} from "../../components/form";
import { Alert, alpha, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { editJob } from "./jobSlice";

const JobPostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  industry: Yup.string().required("Industry is required"),
  description: Yup.string().required("Description is required"),
});

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

function EditJobForm({ job, toggleEdit }) {
  const dispatch = useDispatch();

  const defaultValues = {
    title: job.title,
    industry: job.industry,
    description: job.description,
  };

  const methods = useForm({
    resolver: yupResolver(JobPostSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(
        editJob({
          jobId: job._id,
          title: data.title,
          industry: data.industry,
          description: data.description,
          image: data.image,
        })
      );
      window.location.reload();
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

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
          defaultValue="Hello World"
          sx={{
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: alpha("#919EAB", 0.32),
            },
          }}
        />
        <FUploadImage
          name="image"
          accept="image/*"
          maxSize={3145728}
          onDrop={handleDrop}
          sx={{ width: "50%", alignSelf: "center" }}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button
            variant="contained"
            onClick={toggleEdit}
            sx={{
              width: "10%",
              minWidth: { xs: 100, md: 200 },
              backgroundColor: "#E53838",
              ":hover": {
                filter: "brightness(120%)",
                backgroundColor: "#E53838",
              },
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              width: "10%",
              minWidth: { xs: 100, md: 200 },
            }}
          >
            Confirm Edit
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default EditJobForm;
