import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import debounce from "lodash.debounce";
import ReactCursorPosition, { INTERACTIONS } from "@appinfini/react-cursor-position";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as edittingMapActions from "../../actions/edittingMap";
import Grid from "@material-ui/core/Grid";
import AnchorDialog from "../AnchorDialog/index";
import AnchorEditor from "../AnchorEditor/index";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
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
      imageLoaded: false,
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
      this.reset();
    }
  };

  handleChange = (event) => {
    const { edittingMapActionCreators } = this.props;
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
    if (name === "name") {
      edittingMapActionCreators.setUploadingMapName(event.target.value);
    } else if (name === "ratio") {
      edittingMapActionCreators.setUploadingMapRatio(event.target.value);
    }
  };

  openAnchorDialog = () => {
    this.setState({ openDialog: true });
  };

  closeAnchorDialog = () => {
    this.setState({ openDialog: false });
  };

  // handleDrag = (e, ui) => {
  //   const { deltaPosition } = this.state;
  //   this.setState({
  //     deltaPosition: [
  //       deltaPosition[0] + ui.deltaX,
  //       deltaPosition[1] + ui.deltaY,
  //     ],
  //   });
  // };

  // handleDragStop = (anchor) => () => {
  //   const { edittingMapActionCreators, edittingMap } = this.props;
  //   const { deltaPosition, elementDimensions } = this.state;
  //   const realX =
  //     anchor.x +
  //     Math.floor(
  //       ((deltaPosition[0] * edittingMap.width) / elementDimensions[0]) * 100
  //     ) /
  //       100;
  //   const realY =
  //     anchor.y +
  //     Math.floor(
  //       ((deltaPosition[1] * edittingMap.height) / elementDimensions[1]) * 100
  //     ) /
  //       100;
  //   edittingMapActionCreators.updateNewAnchor({
  //     ...anchor,
  //     x: realX,
  //     y: realY,
  //   });
  // };

  reset = debounce(
    () => {
      this.rcp.reset();
    },
    100,
    {
      leading: false,
      trailing: true,
    }
  );

  handleCancel = () => {};

  handleFinish = () => {};

  render() {
    const { classes, edittingMap } = this.props;
    const {
      cursorPosition,
      elementDimensions,
      isImageSelected,
      openDialog,
      imageLoaded,
    } = this.state;
    const realX = Math.round(
      (cursorPosition[0] * edittingMap.width) / elementDimensions[0]
    );
    const realY = Math.round(
      (cursorPosition[1] * edittingMap.height) / elementDimensions[1]
    );
    return (
      <>
        <Grid container spacing={1} style={{ padding: 8 }}>
          <Grid item xs={10} className={classes.gridItem}>
            <ReactCursorPosition
              activationInteractionMouse={INTERACTIONS.HOVER}
              onPositionChanged={this.handleCursorMoved}
              onActivationChanged={this.changeImageSelected}
              className={clsx(classes.image, {
                [classes.imageActive]: isImageSelected,
              })}
              ref={(rcp) => (this.rcp = rcp)}
            >
              <img
                className={clsx({
                  [classes.imageLoaded]: imageLoaded,
                  [classes.imageNotLoaded]: !imageLoaded,
                })}
                src={edittingMap.image.url}
                width="100%"
                onDoubleClick={this.openAnchorDialog}
                onLoad={() => this.setState({ imageLoaded: true })}
              />
              {imageLoaded ? null : (
                <Skeleton variant="rect" width={400} height={400} />
              )}
              {edittingMap.anchors.map((anchor) => {
                const p_x = Math.floor(
                  (anchor.x * elementDimensions[0]) / edittingMap.width
                );
                const p_y = Math.floor(
                  (anchor.y * elementDimensions[1]) / edittingMap.height
                );
                return (
                  <div
                    key={anchor.id}
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
                      {anchor.deviceId}
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
          <Grid item xs={2} className={classes.anchorList}>
            {edittingMap.anchors.map((anchor) => (
              <AnchorEditor key={anchor.id} anchor={anchor} />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              onClick={this.handleCancel}
              className={classes.button}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFinish}
              className={classes.button}
            >
              Finish
            </Button>
          </Grid>
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
)(AnchorsEditor);
