import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import clsx from "clsx";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as mapActions from "../../actions/map";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from '@material-ui/core/CardContent';
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
    const { mapInfo, mapActionCreators } = this.props;
    this.setState({ openDeleteDialog: false });
    mapActionCreators.deleteMap(mapInfo.id);
  };

  handleEditClick = (event) => {
    const { history, mapInfo } = this.props;
    history.push(`/maps/edit/${mapInfo.id}`);
    event.stopPropagation();
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
    const { openDeleteDialog } = this.state;
    return (
      <Card
        className={clsx(classes.container, className, {
          [classes.active]: active,
        })}
        onClick={onClick}
      >
        <CardMedia
          className={classes.media}
          image={mapInfo.image.url}
          title={mapInfo.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {mapInfo.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Number of anchors: {mapInfo.anchors.length}
          </Typography>
        </CardContent>
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
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    maps: state.maps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapActionCreators: bindActionCreators(mapActions, dispatch),
  };
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(EditableMap);
