import React from "react";
import {
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fToNow } from "../../utils/formatTime";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useAuth from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentEditForm from "./CommentEditForm";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import { useParams } from "react-router-dom";

function CommentCard({ comment, lister }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleEditComment = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteComment = async () => {
    await dispatch(deleteComment(comment._id, jobId));
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={toggleEditComment} sx={{ mx: 1 }}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleClickOpen();
          handleMenuClose();
        }}
        sx={{ mx: 1 }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      {comment.author._id === lister._id ? (
        <Paper
          sx={{
            p: 1.5,
            flexGrow: 1,
            backgroundColor: "rgba(105, 189, 191 ,0.4)",
            maxWidth: "100%",
          }}
        >
          <Stack
            direction="row"
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {comment.author?.name}
              </Typography>
              <Typography fontSize={12} sx={{ fontWeight: 600 }}>
                (Client)
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fToNow(comment.createdAt)}
            </Typography>
          </Stack>
          {isEditing ? (
            <CommentEditForm
              comment={comment}
              handleMenuClose={handleMenuClose}
              toggleEdit={toggleEditComment}
            />
          ) : (
            <>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  wordWrap: "break-word",
                }}
              >
                {comment.content}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {comment.author._id === user._id ? (
                  <>
                    <IconButton>
                      <MoreHorizIcon
                        onClick={handleProfileMenuOpen}
                        sx={{ fontSize: 30 }}
                      />
                    </IconButton>
                    {renderMenu}
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
                          onClick={handleDeleteComment}
                          autoFocus
                          sx={{ fontWeight: 600 }}
                        >
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : null}
              </Box>{" "}
            </>
          )}
        </Paper>
      ) : (
        <Paper
          sx={{
            p: 1.5,
            flexGrow: 1,
            bgcolor: "background.neutral",
            maxWidth: "100%",
          }}
        >
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
              {fToNow(comment.createdAt)}
            </Typography>
          </Stack>
          {isEditing ? (
            <CommentEditForm
              comment={comment}
              handleMenuClose={handleMenuClose}
              toggleEdit={toggleEditComment}
            />
          ) : (
            <>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  wordWrap: "break-word",
                }}
              >
                {comment.content}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {comment.author._id === user._id ? (
                  <>
                    <IconButton>
                      <MoreHorizIcon
                        onClick={handleProfileMenuOpen}
                        sx={{ fontSize: 30 }}
                      />
                    </IconButton>
                    {renderMenu}
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
                          onClick={handleDeleteComment}
                          autoFocus
                          sx={{ fontWeight: 600 }}
                        >
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : null}
              </Box>{" "}
            </>
          )}
        </Paper>
      )}
    </Stack>
  );
}

export default CommentCard;
