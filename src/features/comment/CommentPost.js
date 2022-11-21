import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Card, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import SendIcon from "@mui/icons-material/Send";

const NewCommentSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
};

const CommentPost = ({ setPage }) => {
  const methods = useForm({
    resolver: yupResolver(NewCommentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log("comment created");
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
          <FTextField
            name="content"
            label="Question"
            placeholder="Enter your question"
          />

          <LoadingButton size="small" type="submit">
            <SendIcon />
          </LoadingButton>
        </Card>
      </FormProvider>
    </Container>
  );
};

export default CommentPost;
