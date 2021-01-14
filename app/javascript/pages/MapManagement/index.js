import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as mapActions from "../../actions/map";
import styles from "./styles";

class MapManagement extends Component {
  render() {
    const { classes, maps } = this.props;
    return (
      <div>
        {maps.map((m) => (
          <div key={m.name}>
            <img src={m.img_url} width={200}/>
            <span>{m.name}</span>
          </div>
        ))}
      </div>
    );
  }
}

MapManagement.propTypes = {
  classes: PropTypes.object,
  maps: PropTypes.array,
  mapActionsCreators: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    maps: state.maps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapActionsCreators: bindActionCreators(mapActions, dispatch),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(MapManagement);
