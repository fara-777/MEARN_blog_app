import { useSelector } from "react-redux";
import { Button, Container, Grid, Paper } from "@mui/material";
import Post from "../post";
import gridFour from "../../images/grid_four.svg";
import gridThree from "../../images/grid_three.svg";
import { useState } from "react";

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const [layout, setLayout] = useState("gridThree");

  const calculateMd = () => {
    return layout === "gridThree" ? 4 : 3;
  };

  return (
    <>
      <Container maxWidth={"lg"}>
        <Paper sx={{ display: { xs: "none", md: "block" } }}>
          <div style={{ marginTop: 20, float: "right" }}>
            <Button
              variant="text"
              size="small"
              onClick={() => setLayout("gridThree")}
            >
              <img
                src={gridThree}
                alt="Three Columns Grid Icons"
                style={{ background: layout === "gridThree" ? "" : "#ccc" }}
              />
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => setLayout("gridFour")}
            >
              <img
                src={gridFour}
                alt="Four Columns Grid Icons"
                style={{ background: layout === "gridFour" ? "" : "#ccc" }}
              />
            </Button>
          </div>
        </Paper>
        <Grid
          container
          spacing={2}
          marginTop={4}
          marginBottom={4}
          alignContent="stretch"
        >
          {posts.length > 0 &&
            posts.map((post) => (
              <Grid xs={12} md={calculateMd()} key={post?._id}>
                <Post {...post} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default PostList;
