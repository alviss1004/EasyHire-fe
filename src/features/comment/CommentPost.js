import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Card, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { createComment } from "./commentSlice";

const CommentSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
};

const CommentPost = ({ jobId }) => {
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    await dispatch(createComment({ ...data, jobId }));
    reset();
  };
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "flex-start",
            p: "1rem",
          }}
        >
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <FTextField
            name="content"
            placeholder="Enter your question (maximum 400 words)"
            inputProps={{ maxLength: 400 }}
          />

          <LoadingButton size="small" type="submit" loading={isSubmitting}>
            <SendIcon />
          </LoadingButton>
        </Card>
      </FormProvider>
    </Container>
  );
};

export default CommentPost;
