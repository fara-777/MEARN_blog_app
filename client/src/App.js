import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import PenIcon from "@mui/icons-material/Edit";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PostList from "./components/post-list";
import AddPostsForm from "./components/addposts-form";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/action/post";
import PostDetails from "./components/post-deatils";

export default function App() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    const savedThemeMode = localStorage.getItem("themeMode");

    const initialMode = savedThemeMode || "light";
    setMode(initialMode);

    dispatch(fetchPosts());
  }, [dispatch]);

  const toggleThemeMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container
          maxWidth={"lg"}
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <AppBar
            sx={{ marginTop: 2, border: "1px solid #90caf9" }}
            position="static"
            color="inherit"
            elevation={0}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ marginRight: 2 }}
              />
              <Typography
                variant="h6"
                color={"secondary"}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                <a href="/posts">Blogify</a>
              </Typography>
              <Button
                color={"primary"}
                variant="outlined"
                startIcon={<PenIcon />}
                onClick={handleOpen}
              >
                New Post
              </Button>
              <Button onClick={toggleThemeMode}>
                <DarkModeTwoToneIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container mx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/posts" element={<PostList />} />
                  <Route exact path="/posts/:id" element={<PostDetails />} />
                  <Route path="/" element={<Navigate to="/posts" />} />
                </Routes>
              </BrowserRouter>
            </Grid>
          </Grid>
          <AddPostsForm open={open} handleClose={handleClose} />
        </Container>
      </ThemeProvider>
    </>
  );
}
