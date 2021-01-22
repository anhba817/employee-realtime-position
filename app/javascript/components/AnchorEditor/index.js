import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as mapActions from "../../actions/map";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmationDialog from "../ConfirmationDialog/index";
import styles from "./styles";

class AnchorEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deviceId: props.anchor.deviceId,
      x: props.anchor.x,
      y: props.anchor.y,
      isEditted: false,
    };
  }

  handleDeleteClick = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleCloseDeleteDialog = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDelete = () => {
    const { edittingMap, mapActionCreators, anchor } = this.props;
    this.setState({ openDeleteDialog: false });
    if (edittingMap.id) {
      mapActionCreators.deleteAnchor(edittingMap.id, anchor.id);
    } else {
      mapActionCreators.deleteAnchorFailed({
        message: "No map id found",
      });
    }
  };

  cancelEdit = () => {
    const { anchor } = this.props;
    this.setState({
      deviceId: anchor.deviceId,
      x: anchor.x,
      y: anchor.y,
      isEditted: false,
    });
  };

  saveEdit = () => {
    const {  edittingMap, mapActionCreators, anchor } = this.props;
    const { deviceId, x, y } = this.state;
    this.setState({isEditted: false});
    if (edittingMap.id) {
      mapActionCreators.updateAnchor({
        mapId: edittingMap.id,
        id: anchor.id,
        deviceId,
        x,
        y,
      });
    } else {
      mapActionCreators.updateAnchorFailed({
        message: "No map id found",
      });
    }
  }

  handleOnChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
      isEditted: true,
    });
  };

  render() {
    const { classes, anchor } = this.props;
    const { openDeleteDialog, isEditted, deviceId, x, y } = this.state;
    return (
      <Card className={classes.container}>
        <TextField
          label="deviceId"
          variant="outlined"
          name="deviceId"
          value={deviceId}
          fullWidth
          size="small"
          onChange={this.handleOnChange}
        />
        <div className={classes.coordinate}>
          <TextField
            label="X"
            variant="outlined"
            name="x"
            value={x}
            fullWidth
            size="small"
            onChange={this.handleOnChange}
            className={classes.item}
          />
          <TextField
            label="Y"
            variant="outlined"
            name="y"
            value={y}
            fullWidth
            size="small"
            onChange={this.handleOnChange}
            className={classes.item}
          />
        </div>
        {isEditted ? (
          <div className={classes.coordinate}>
            <Button color="primary" onClick={this.saveEdit}>Save</Button>
            <Button onClick={this.cancelEdit}>Cancel</Button>
          </div>
        ) : null}
        <IconButton
          className={classes.deleteButton}
          onClick={this.handleDeleteClick}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <ConfirmationDialog
          open={openDeleteDialog}
          title={`Are you sure you want to delete this anchor ?`}
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
    edittingMap: state.edittingMap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapActionCreators: bindActionCreators(mapActions, dispatch),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AnchorEditor);
