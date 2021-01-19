import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import clsx from "clsx";
import ImageUploading from "react-images-uploading";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
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
    };
    this.state = this.initialState;
  }

  onChangeImage = (imageList) => {
    this.setState({ image: imageList[0] });
  };

  onImgLoad = ({ target: img }) => {
    this.setState({ width: img.naturalWidth, height: img.naturalHeight });
  };

  clearUploadingMap = () => {
    this.setState(this.initialState);
  };

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleCancel = () => {
    const { history } = this.props;
    this.setState(this.initialState);
    history.push("/");
  };

  handleNext = () => {
    const { image, name, ratio, width, height } = this.state;
    const { edittingMapActionCreators } = this.props;
    edittingMapActionCreators.uploadCurrentMap(image, name, ratio, width, height);
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
            dataURLKey="data_url"
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
                      src={imageList[0].data_url}
                      style={{ margin: 10, width: "100%" }}
                      alt=""
                      onLoad={this.onImgLoad}
                    />
                  ) : (
                    "Click or Drop here"
                  )}
                </Button>
                {imageList.length > 0 ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      onImageRemoveAll();
                      this.clearUploadingMap();
                    }}
                  >
                    Remove
                  </Button>
                ) : null}
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

const mapDispatchToProps = (dispatch) => {
  return {
    uiActionCreators: bindActionCreators(uiActions, dispatch),
    edittingMapActionCreators: bindActionCreators(edittingMapActions, dispatch),
  };
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(MapEditor);
