import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as uploadingMapActions from "../../actions/uploadingMap";
import styles from "./styles";
import { Typography } from "@material-ui/core";

class AnchorDialog extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      anchorId: "",
      x: 0,
      y: 0,
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    const { x, y } = this.props;
    if (x) {
      this.setState({ x });
    }
    if (y) {
      this.setState({ y });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.x !== this.props.x) {
      this.setState({ x: this.props.x });
    }
    if (prevProps.y !== this.props.y) {
      this.setState({ y: this.props.y });
    }
  }

  handleOnChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { handleClose, uploadingMapActionCreators } = this.props;
    const { anchorId, x, y } = this.state;
    uploadingMapActionCreators.addNewAnchor({
      anchorId,
      x,
      y
    })
    handleClose();
  };

  render() {
    const { open, handleClose } = this.props;
    const { anchorId, x, y } = this.state;
    return (
      <Dialog
        open={open}
        TransitionComponent={Zoom}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ position: "relative" }}>
          Add new Anchor
          <IconButton
            size="small"
            onClick={handleClose}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography>Anchor ID:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={anchorId}
              name="anchorId"
              onChange={this.handleOnChange}
              style={{ marginTop: 5 }}
              size="small"
            />
          </div>
          <Typography>Coordinates:</Typography>
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="x"
              value={x}
              name="x"
              onChange={this.handleOnChange}
              style={{ marginTop: 10 }}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="y"
              value={y}
              name="y"
              onChange={this.handleOnChange}
              style={{ marginTop: 10 }}
              size="small"
            />
          </div>
        </DialogContent>
        <DialogActions style={{ paddingLeft: 25, paddingRight: 25 }}>
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
)(AnchorDialog);
