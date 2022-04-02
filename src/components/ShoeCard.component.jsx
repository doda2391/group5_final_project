import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function ShoeCard(props) {
  const [buttonColor, setButtonColor] = React.useState("grey");
  // const [isLiked, setIsLiked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={props.name} />
        <CardMedia
          component="img"
          height="194"
          image={props.image}
          alt="Paella dish"
        />
        <Typography variant="body2" color="text.secondary">
          {props.price < props.average ? `$${props.price}` : `20% discount $${props.price}`}
        </Typography>
        <CardContent></CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (buttonColor === "grey") {
                setButtonColor("red");
              } else {
                setButtonColor("grey");
              }
            }}
          >
            <FavoriteIcon style={{ color: buttonColor }} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>More Information:</Typography>
            <Typography paragraph>{props.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
}
