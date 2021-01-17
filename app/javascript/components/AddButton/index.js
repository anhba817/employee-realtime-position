import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import { withRouter } from "react-router";
import { compose } from "redux";
import Tooltip from "@material-ui/core/Tooltip";
import AddLocationTwoToneIcon from '@material-ui/icons/AddLocationTwoTone';
import styles from "./styles";

class AddButton extends Component {
  render() {
    const { classes, history, className } = this.props;
    return (
      <Card
        className={clsx(classes.container, className)}
        onClick={() => history.push("/new")}
      >
        <Tooltip className={classes.media} title="Add new map">
          <AddLocationTwoToneIcon />
        </Tooltip>
      </Card>
    );
  }
}

export default compose(withStyles(styles), withRouter)(AddButton);
