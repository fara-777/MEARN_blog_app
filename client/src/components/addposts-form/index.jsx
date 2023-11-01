import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/action/post";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags).required(),
});

export default function AddPostsForm({ open, handleClose }) {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(postSchema),
  });
  const onSubmit = (data) => {
    dispatch(createPost({ ...data, image: file }));
    clearForm();
  };

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 1 }}>
            Fill out the form below to create a new post.
          </DialogContentText>

          <div>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                id="title"
                label="Title"
                name="title"
                variant="outlined"
                size="small"
                {...register("title")}
                error={errors.title ? true : false}
                fullWidth
                sx={{ mb: 3 }}
              />

              <TextField
                id="subtitle"
                label="Subtitle"
                name="subtitle"
                variant="outlined"
                size="small"
                {...register("subtitle")}
                error={errors.subtitle ? true : false}
                fullWidth
                sx={{ mb: 2 }}
              />

              <Controller
                name="tag"
                control={control}
                defaultValue={tags[0]}
                render={({ field }) => (
                  <Select {...field} input={<Input />} fullWidth sx={{ mb: 3 }}>
                    {tags.map((tag, i) => (
                      <MenuItem key={i} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              <TextField
                id="content"
                label="Content"
                name="content"
                variant="outlined"
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
                size="small"
                {...register("content")}
                error={errors.content ? true : false}
                fullWidth
              />

              <FileBase64
                multiple={false}
                onDone={({ base64 }) => setFile(base64)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions sx={{ pr: 3 }}>
          <Button color="inherit" onClick={clearForm}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
