import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationDialog from "../ConfirmationDialog/index";
import styles from "./styles";

class EditableMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      openEditDialog: false,
    };
  }

  handleDeleteClick = (event) => {
    this.setState({ openDeleteDialog: true });
    event.stopPropagation();
  };

  handleCloseDeleteDialog = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDelete = () => {
    const { handleDeleteItem, content } = this.props;
    this.setState({ openDeleteDialog: false });
    if (handleDeleteItem) {
      handleDeleteItem(content.id);
    }
  };

  handleEditClick = (event) => {
    this.setState({ openEditDialog: true });
    event.stopPropagation();
  };

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false });
  };

  render() {
    const {
      classes,
      active,
      className,
      editable,
      deletable,
      mapInfo,
      onClick,
    } = this.props;
    const { openDeleteDialog, openEditDialog } = this.state;
    return (
      <Card
        className={clsx(classes.container, className, {
          [classes.active]: active,
        })}
        onClick={onClick}
      >
        <CardMedia
          className={classes.media}
          image={mapInfo.img_url}
          title={mapInfo.name}
        />
        <span className={clsx(classes.buttonWrapper, "hidden-button")}>
          {editable ? (
            <IconButton
              className={classes.editButton}
              onClick={this.handleEditClick}
            >
              <EditIcon style={{ fontSize: 12 }} />
            </IconButton>
          ) : null}
          {deletable ? (
            <IconButton
              className={classes.deleteButton}
              onClick={this.handleDeleteClick}
            >
              <CloseIcon style={{ fontSize: 16 }} />
            </IconButton>
          ) : null}
        </span>
        <ConfirmationDialog
          open={openDeleteDialog}
          title={`Are you sure you want to delete this map ?`}
          text="You cannot undo this deletion"
          handleClose={this.handleCloseDeleteDialog}
          handleOKClick={this.handleDelete}
        />
        <ConfirmationDialog
          open={openEditDialog}
          title="Edit form not built"
          text="You cannot undo this deletion"
          handleClose={this.handleCloseEditDialog}
          handleOKClick={this.handleCloseEditDialog}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(EditableMap);
