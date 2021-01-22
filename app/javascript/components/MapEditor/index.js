import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import clsx from "clsx";
import ImageUploading from "react-images-uploading";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as mapActions from "../../actions/map";
import * as uiActions from "../../actions/ui";
import * as edittingMapActions from "../../actions/edittingMap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";

class MapEditor extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      image: null,
      name: "",
      ratio: 1.0,
      width: 0,
      height: 0,
      isImageChanged: false,
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    const { edittingMap } = this.props;
    if (edittingMap.id !== "") {
      this.setState({
        image: edittingMap.image,
        name: edittingMap.name,
        ratio: edittingMap.ratio,
        width: edittingMap.width,
        height: edittingMap.height,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.edittingMap.id !== this.props.edittingMap.id) {
      this.setState({
        image: this.props.edittingMap.image,
        name: this.props.edittingMap.name,
        ratio: this.props.edittingMap.ratio,
        width: this.props.edittingMap.width,
        height: this.props.edittingMap.height,
      });
    }
  }

  onChangeImage = (imageList) => {
    this.setState({ image: imageList[0], isImageChanged: true });
  };

  onImgLoad = ({ target: img }) => {
    this.setState({ width: img.naturalWidth, height: img.naturalHeight });
  };

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleCancel = () => {
    const { history, edittingMapActionCreators } = this.props;
    edittingMapActionCreators.clearEdittingMap();
    this.setState(this.initialState);
    history.push("/maps");
  };

  handleNext = () => {
    const { image, name, ratio, width, height, isImageChanged } = this.state;
    const { uiActionCreators, mapActionCreators, edittingMap } = this.props;
    if (edittingMap.id !== "") {
      if (isImageChanged) {
        // Re-upload if image changed
        mapActionCreators.updateMap(edittingMap.id, {
          image: image.file,
          name,
          ratio,
          width,
          height,
        });
      } else {
        // otherwise update map info only
        if (edittingMap.name !== name || edittingMap.ratio !== ratio) {
          mapActionCreators.updateMap(edittingMap.id, {
            name,
            ratio,
          });
        } else {
          uiActionCreators.setActiveMapAddingStep(1);
        }
      }
    } else {
      mapActionCreators.addMap(
        image,
        name,
        ratio,
        width,
        height
      );
    }
  };

  render() {
    const { classes } = this.props;
    const { name, ratio, image } = this.state;
    const images = image ? [image] : [];
    return (
      <Grid container spacing={1} style={{ padding: 8 }}>
        <Grid item xs={12} className={classes.gridItemText}>
          <Typography>Info:</Typography>
        </Grid>
        <Grid item xs={8} className={classes.gridItemText}>
          <TextField
            id="outlined-basic-1"
            label="Name"
            variant="outlined"
            name="name"
            onChange={this.handleChange}
            value={name}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          <TextField
            id="outlined-basic-2"
            label="Ratio"
            variant="outlined"
            name="ratio"
            onChange={this.handleChange}
            value={ratio}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} className={classes.gridItemText}>
          <Typography>Picture:</Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <ImageUploading
            value={images}
            onChange={this.onChangeImage}
            maxNumber={1}
            dataURLKey="url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div
                style={{
                  width: "100%",
                  // display: "flex",
                  // flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                <Button
                  className={clsx({
                    [classes.backgroundButton]: imageList.length <= 0,
                    [classes.imageButton]: imageList.length > 0,
                  })}
                  style={isDragging ? { color: "red" } : null}
                  onClick={() => onImageUpdate(0)}
                  {...dragProps}
                >
                  {imageList.length > 0 ? (
                    <img
                      src={imageList[0].url}
                      style={{ margin: 10, width: "100%" }}
                      alt=""
                      onLoad={this.onImgLoad}
                    />
                  ) : (
                    "Click or Drop here"
                  )}
                </Button>
              </div>
            )}
          </ImageUploading>
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
            onClick={this.handleNext}
            className={classes.button}
          >
            Next
          </Button>
        </Grid>
      </Grid>
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
    uiActionCreators: bindActionCreators(uiActions, dispatch),
    edittingMapActionCreators: bindActionCreators(edittingMapActions, dispatch),
    mapActionCreators: bindActionCreators(mapActions, dispatch),
  };
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(MapEditor);
