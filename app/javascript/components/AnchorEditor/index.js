import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as edittingMapActions from "../../actions/edittingMap";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmationDialog from "../ConfirmationDialog/index";
import styles from "./styles";

class AnchorEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
    };
  };

  handleDeleteClick = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleCloseDeleteDialog = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDelete = () => {
    const { edittingMap, edittingMapActionCreators, anchor } = this.props;
    this.setState({ openDeleteDialog: false });
    if (edittingMap.id) {
      edittingMapActionCreators.deleteAnchor(edittingMap.id, anchor.id);
    } else {
      edittingMapActionCreators.deleteAnchorFailed({message: "No map id found"});
    }
  };

  render() {
    const { classes, anchor } = this.props;
    const { openDeleteDialog } = this.state;
    return (
      <Card className={classes.container}>
        <TextField
          label="deviceId"
          variant="outlined"
          value={anchor.deviceId}
          fullWidth
          size="small"
        />
        <div className={classes.coordinate}>
          <TextField
            label="X"
            variant="outlined"
            value={anchor.x}
            fullWidth
            size="small"
            className={classes.item}
          />
          <TextField
            label="Y"
            variant="outlined"
            value={anchor.y}
            fullWidth
            size="small"
            className={classes.item}
          />
        </div>
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
    edittingMapActionCreators: bindActionCreators(edittingMapActions, dispatch),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AnchorEditor);
