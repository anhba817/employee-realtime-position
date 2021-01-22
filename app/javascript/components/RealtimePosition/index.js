import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "./styles";

class RealtimePosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  onImgLoad = ({ target: img }) => {
    console.log(img);
    // this.setState({ width: img.naturalWidth, height: img.naturalHeight });
  };

  render() {
    const { classes, map } = this.props;
    return (
      <div className={classes.container}>
        <img src={map.image.url} width="100%" onLoad={this.onImgLoad} />
        {map.anchors.map((anchor) => {
          const p_x = Math.floor((anchor.x * 10000) / map.width)/100.0;
          const p_y = Math.floor((anchor.y * 10000) / map.height)/100.0;
          return (
            <div
              key={anchor.id}
              style={{
                position: "absolute",
                top: `calc(${p_y}% - 6px)`,
                left: `calc(${p_x}% - 6px)`,
                zIndex: 100,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "red",
                }}
              />
              <h5 style={{ color: "red", margin: 0, padding: 0 }}>
                {anchor.deviceId}
              </h5>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    maps: state.maps,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, null)
)(RealtimePosition);
