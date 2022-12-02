import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import { editComment } from "./commentSlice";
import { useParams } from "react-router-dom";
const CommentSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

function CommentEditForm({ comment, toggleEdit, handleMenuClose }) {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const defaultValues = {
    content: comment.content,
  };
  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    await dispatch(editComment({ ...data, commentId: comment._id, jobId }));
    toggleEdit();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.responseError && (
        <Alert severity="error">{errors.responseError.message}</Alert>
      )}
      <Stack spacing={1}>
        <FTextField
          name="content"
          multiline
          rows={4}
          inputProps={{ maxLength: 400 }}
          sx={{ backgroundColor: "background.paper" }}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button
            variant="contained"
            onClick={() => {
              toggleEdit();
              handleMenuClose();
            }}
            sx={{
              maxHeight: 35,
              width: "7%",
              minWidth: { xs: 70, md: 140 },
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
              maxHeight: 35,
              width: "7%",
              minWidth: { xs: 70, md: 140 },
            }}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default CommentEditForm;
