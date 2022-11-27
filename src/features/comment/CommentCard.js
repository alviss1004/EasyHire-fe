import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function CommentCard({ comment }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {comment.author._id === user._id ? (
            <>
              <IconButton aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Delete confirmation"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this comment?
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
                    onClick={handleClose}
                    autoFocus
                    sx={{ fontWeight: 600 }}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : null}
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
