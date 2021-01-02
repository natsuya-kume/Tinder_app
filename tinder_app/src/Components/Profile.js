import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(180deg)",
    marginLeft: "auto",
    color: "white",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(0deg)",
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  return (
    <div
      style={{ backgroundImage: "url(" + props.character.image + ")" }}
      className="card"
    >
      <Collapse
        in={props.expanded}
        timeout="auto"
        className="prof_container"
        unmountOnExit
      >
        <Typography className="prof_text">
          {props.character.self_introduction}
        </Typography>
      </Collapse>
      <CardActions disableSpacing className="item_container">
        {props.expanded === false ? (
          <p className="prof_name">
            {props.character.name}, {props.character.age}
          </p>
        ) : null}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: props.expanded,
          })}
          onClick={props.handleExpandClick}
          aria-expanded={props.expanded}
          aria-label="show more"
          onTouchStart={props.handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </div>
  );
};

export default Profile;
