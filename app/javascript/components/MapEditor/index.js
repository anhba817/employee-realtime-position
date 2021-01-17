import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ImageUploading from "react-images-uploading";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as uploadingMapActions from "../../actions/uploadingMap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from "./styles";

class MapEditor extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      images: [],
      name: "",
      ratio: 1.0,
    };
    this.state = this.initialState;
  }

  onChangeImage = (imageList) => {
    this.setState({ images: imageList });
    const { uploadingMapActionCreators } = this.props;
    uploadingMapActionCreators.setUploadingMap(imageList[0]);
  };

  onImgLoad = ({ target: img }) => {
    const { uploadingMapActionCreators } = this.props;
    uploadingMapActionCreators.setUploadingMapSize(
      img.naturalWidth,
      img.naturalHeight
    );
  };

  clearUploadingMap = () => {
    const { uploadingMapActionCreators } = this.props;
    uploadingMapActionCreators.clearUploadingMap();
  };

  handleChange = (event) => {
    const { uploadingMapActionCreators } = this.props;
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
    if(name === "name") {
      uploadingMapActionCreators.setUploadingMapName(event.target.value);
    } else if(name === "ratio") {
      uploadingMapActionCreators.setUploadingMapRatio(event.target.value);
    }
  };

  render() {
    const { classes, uploadingMap } = this.props;
    const { name, ratio } = this.state;
    const images = uploadingMap.image? [uploadingMap.image]: [];
    let img_width = "100%";
    if(uploadingMap.size[0] !== 0) {
      let img_height = Math.floor(
        (1000 * uploadingMap.size[1]) / uploadingMap.size[0]
      );
      if (img_height > 500) {
        img_width = Math.floor(
          (500 * uploadingMap.size[0]) / uploadingMap.size[1]
        );
      }
    }
    return (
      <Grid container spacing={1} style={{ padding: 8 }}>
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
                      style={{ margin: 10, width: img_width }}
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
      </Grid>
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
)(MapEditor);
