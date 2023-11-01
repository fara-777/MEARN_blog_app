import moment from "moment";
import { Link } from "react-router-dom";
import {
  Card,
  Chip,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import noImage from "../../images/noimage.svg";

export default function Post({
  _id,
  title,
  subtitle,
  content,
  tag,
  image,
  createdAt,
}) {
  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };
  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="center">
          <Card
            sx={{
              maxWidth: 374,
              position: "relative",
              marginTop: 2,
            }}
          >
            <CardMedia
              image={image || noImage}
              title="Image"
              sx={{
                height: 0,
                paddingTop: "56.25%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backgroundBlendMode: "darken",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                color: "white",
              }}
            >
              <Typography variant="h6">Farhad</Typography>
              <Typography variant="body2">
                {convertRelativeTime(createdAt)}
              </Typography>
            </div>
            <CardContent>
              <Typography variant="h6" component="p" gutterBottom={true}>
                {title}
              </Typography>
              <Typography variant="overline" component="p" gutterBottom={true}>
                {subtitle}
              </Typography>
              <Typography variant="body2" component="p">
                {content?.substring(0, 250) + "..."}
              </Typography>
              <Chip
                label={` # ${tag}`}
                variant="outlined"
                sx={{ mt: 1 }}
                color="primary"
              />
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                <Link to={`/posts/${_id}`}>Read More ...</Link>
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
