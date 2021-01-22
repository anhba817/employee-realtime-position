import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import AddLocationTwoToneIcon from "@material-ui/icons/AddLocationTwoTone";
import styles from "./styles";

class AddButton extends Component {
  handleClick = () => {
    const { history } = this.props;
    console.log("goto new map");
    history.push("/maps/new");
  };

  render() {
    return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddLocationTwoToneIcon />}
          onClick={this.handleClick}
          style={{ width: 150, margin: 16}}
        >
          Add new map
        </Button>
    );
  }
}

export default compose(withStyles(styles), withRouter)(AddButton);
