import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";

import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Container,
  CssBaseline,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { updatePost } from "../../redux/action/post";

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags).required(),
});

export default function EditPostForm({ post, closeEditMode }) {
  const dispatch = useDispatch();

  const [file, setFile] = useState(post?.image);

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
    const updatedPost = {
      _id: post._id,
      ...data,
      image: file,
    };
    dispatch(updatePost(post._id, updatedPost));

    reset();
    setFile(null);
    closeEditMode();
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth={"lg"}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
            defaultValue={post?.title}
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
            defaultValue={post?.subtitle}
          />

          <Controller
            render={({ field }) => (
              <Select {...field} input={<Input />} fullWidth sx={{ mb: 3 }}>
                {tags.map((tag, i) => (
                  <MenuItem key={i} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            )}
            name="tag"
            control={control}
            defaultValue={post?.tag}
            error={errors.tag ? true : false}
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
            defaultValue={post?.content}
          />

          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setFile(base64)}
          />
          <div style={{ marginTop: 16 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={closeEditMode}
            >
              Cancel
            </Button>{" "}
            <Button variant="outlined" color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
