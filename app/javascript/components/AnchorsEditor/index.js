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
import Draggable from "react-draggable";
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
        elementDimensions: [
          cursor.elementDimensions.width,
          cursor.elementDimensions.height,
        ],
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

  handleDrag = (e, ui) => {
    const { deltaPosition } = this.state;
    this.setState({
      deltaPosition: [
        deltaPosition[0] + ui.deltaX,
        deltaPosition[1] + ui.deltaY,
      ],
    });
  };

  handleDragStop = (anchor) => () => {
    const { uploadingMapActionCreators, uploadingMap } = this.props;
    const { deltaPosition, elementDimensions } = this.state;
    const realX =
      anchor.x +
      Math.floor(
        ((deltaPosition[0] * uploadingMap.size[0]) / elementDimensions[0]) * 100
      ) /
        100;
    const realY =
      anchor.y +
      Math.floor(
        ((deltaPosition[1] * uploadingMap.size[1]) / elementDimensions[1]) * 100
      ) /
        100;
    uploadingMapActionCreators.updateNewAnchor({
      ...anchor,
      x: realX,
      y: realY,
    });
  };

  render() {
    const { classes, uploadingMap } = this.props;
    const {
      cursorPosition,
      elementDimensions,
      isImageSelected,
      openDialog,
    } = this.state;
    let img_width = 1000;
    let img_height = Math.floor(
      (1000 * uploadingMap.size[1]) / uploadingMap.size[0]
    );
    if (img_height > 500) {
      img_height = 500;
      img_width = Math.floor(
        (500 * uploadingMap.size[0]) / uploadingMap.size[1]
      );
    }
    const realX =
      Math.floor(
        ((cursorPosition[0] * uploadingMap.size[0]) / elementDimensions[0]) *
          100
      ) / 100;
    const realY =
      Math.floor(
        ((cursorPosition[1] * uploadingMap.size[1]) / elementDimensions[1]) *
          100
      ) / 100;
    return (
      <>
        <Grid container spacing={1} style={{ padding: 8 }}>
          <Grid item xs={12} className={classes.gridItem}>
            <ReactCursorPosition
              activationInteractionMouse={INTERACTIONS.HOVER} //default
              // hoverDelayInMs={150} //default 0
              // hoverOffDelayInMs={50} //default 0
              onPositionChanged={this.handleCursorMoved}
              onActivationChanged={this.changeImageSelected}
              className={clsx(classes.image, {
                [classes.imageActive]: isImageSelected,
              })}
            >
              <img
                src={uploadingMap.image.data_url}
                style={{
                  width: img_width,
                  height: img_height,
                }}
                onDoubleClick={this.openAnchorDialog}
              />
              {uploadingMap.anchors.map((anchor) => {
                const p_x = Math.floor(
                  (anchor.x * elementDimensions[0]) / uploadingMap.size[0]
                );
                const p_y = Math.floor(
                  (anchor.y * elementDimensions[1]) / uploadingMap.size[1]
                );
                return (
                  <div
                    style={{
                      position: "absolute",
                      top: p_y - 4,
                      left: p_x - 4,
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "red",
                      }}
                    />
                    <h5 style={{ color: "red", margin: 0, padding: 0 }}>
                      {anchor.anchorId}
                    </h5>
                  </div>
                );
              })}
              {isImageSelected ? (
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
              ) : null}
            </ReactCursorPosition>
          </Grid>
          {uploadingMap.anchors.map((anchor) => (
            <>
              <Grid item xs={4} className={classes.gridItemText}>
                <TextField
                  id={`${anchor.id}-1`}
                  label="ID"
                  variant="outlined"
                  value={anchor.anchorId}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4} className={classes.gridItem}>
                <TextField
                  id={`${anchor.id}-2`}
                  label="X"
                  variant="outlined"
                  value={anchor.x}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4} className={classes.gridItem}>
                <TextField
                  id={`${anchor.id}-3`}
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
