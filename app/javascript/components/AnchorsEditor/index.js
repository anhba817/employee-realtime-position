import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ReactCursorPosition, { INTERACTIONS } from "react-cursor-position";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as uploadingMapActions from "../../actions/uploadingMap";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AnchorDialog from "../AnchorDialog/index";
import styles from "./styles";

class AnchorsEditor extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isImageSelected: false,
      cursorPosition: [0, 0],
      elementDimensions: [1, 1],
      selectedAnchorIndex: 0,
      openDialog: false,
      deltaPosition: [0, 0],
    };
    this.state = this.initialState;
  }

  changeImageSelected = ({ isActive }) => {
    this.setState({ isImageSelected: isActive });
  };

  handleCursorMoved = (cursor) => {
    const { isImageSelected } = this.state;
    if (isImageSelected && cursor.elementDimensions) {
      this.setState({
        cursorPosition: [cursor.position.x, cursor.position.y],
        elementDimensions: [cursor.elementDimensions.width, cursor.elementDimensions.height],
      });
    }
  };

  handleChange = (event) => {
    const { uploadingMapActionCreators } = this.props;
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
    if (name === "name") {
      uploadingMapActionCreators.setUploadingMapName(event.target.value);
    } else if (name === "ratio") {
      uploadingMapActionCreators.setUploadingMapRatio(event.target.value);
    }
  };

  openAnchorDialog = () => {
    this.setState({ openDialog: true });
  };

  closeAnchorDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { classes, uploadingMap } = this.props;
    const {
      cursorPosition,
      elementDimensions,
      isImageSelected,
      openDialog,
    } = this.state;
    const realX = Math.floor(cursorPosition[0]*uploadingMap.size[0]/elementDimensions[0]*100)/100;
    const realY = Math.floor(cursorPosition[1]*uploadingMap.size[1]/elementDimensions[1]*100)/100;
    return (
      <>
        <Grid container spacing={1} style={{ padding: 8 }}>
          <Grid item xs={12} className={classes.gridItem}>
            <ReactCursorPosition
              activationInteractionMouse={INTERACTIONS.HOVER} //default
              hoverDelayInMs={150} //default 0
              hoverOffDelayInMs={50} //default 0
              onPositionChanged={this.handleCursorMoved}
              onActivationChanged={this.changeImageSelected}
              className={clsx(classes.image, {
                [classes.imageActive]: isImageSelected,
              })}
            >
              <img
                src={uploadingMap.image.data_url}
                width="100%"
                onDoubleClick={this.openAnchorDialog}
              />
              <div
                style={{
                  position: "absolute",
                  top: cursorPosition[1],
                  left: cursorPosition[0],
                  zIndex: 100,
                }}
              >
                <h5 style={{ color: "red" }}>
                  x: {realX}, y: {realY}
                </h5>
                <h5>Double click to add new Anchor</h5>
              </div>
            </ReactCursorPosition>
          </Grid>
          {uploadingMap.anchors.map((anchor) => (
            <>
              <Grid item xs={4} className={classes.gridItemText}>
                <TextField
                  id={anchor.id}
                  label="ID"
                  variant="outlined"
                  value={anchor.anchorId}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4} className={classes.gridItem}>
                <TextField
                  id={anchor.id}
                  label="X"
                  variant="outlined"
                  value={anchor.x}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4} className={classes.gridItem}>
                <TextField
                  id={anchor.id}
                  label="Y"
                  variant="outlined"
                  value={anchor.y}
                  fullWidth
                  size="small"
                />
              </Grid>
            </>
          ))}
        </Grid>
        <AnchorDialog
          x={realX}
          y={realY}
          open={openDialog}
          handleClose={this.closeAnchorDialog}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uploadingMap: state.uploadingMap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadingMapActionCreators: bindActionCreators(
      uploadingMapActions,
      dispatch
    ),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AnchorsEditor);
