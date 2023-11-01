import moment from "moment";
import {
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noImage from "../../images/noimage.svg";
import { fetchSinglePost, deletePost } from "../../redux/action/post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPostForm from "../edit-post-form";

export default function PostDetails() {
  const navigate = useNavigate();
  const currentPost = useSelector((state) => state.posts.currentPost);

  const [editMode, setEditMode] = useState(false);

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const removePost = () => {
    dispatch(deletePost(currentPost._id));
    navigate("/posts");
  };

  return (
    <>
      <Paper sx={{ padding: 3, marginBottom: 8, marginTop: 8 }} elevation={0}>
        {editMode ? (
          <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
        ) : (
          <div>
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              padding={1}
              gap={1}
            >
              <Typography variant="h5" gutterBottom={0}>
                {currentPost?.title}
              </Typography>
              <div>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={openEditMode}
                >
                  Edit
                </Button>{" "}
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={removePost}
                >
                  Delete
                </Button>
              </div>
            </Stack>
            <Divider />
            <Typography
              variant="overline"
              gutterBottom={1}
              sx={{ fontSize: 16 }}
            >
              {currentPost?.subtitle}
            </Typography>
            <Typography variant="caption" component="p">
              {convertRelativeTime(currentPost?.createdAt)} by Farhad
            </Typography>
            <Chip
              label={` # ${currentPost?.tag}`}
              variant="outlined"
              color="primary"
              sx={{
                mt: 1,
                mb: 1,
              }}
            />
            <Box maxWidth={"lg"}>
              <img
                style={{
                  maxWidth: "100%",
                  borderRadius: 5,
                  marginTop: 3,
                  marginBottom: 4,
                }}
                src={currentPost?.image || noImage}
                alt="post"
              />
              <Typography variant="body1" gutterBottom={true} sx={{ mt: 2 }}>
                {currentPost?.content}
              </Typography>
            </Box>
          </div>
        )}
      </Paper>
    </>
  );
}
