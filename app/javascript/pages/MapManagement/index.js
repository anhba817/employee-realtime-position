import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as mapActions from "../../actions/map";
import styles from "./styles";
import EditableMap from "../../components/EditableMap/index";
import AddButton from "../../components/AddButton/index";

class MapManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  setActiveIndex = (index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, maps } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div className={classes.container}>
        <AddButton />
        {maps.map((m, index) => (
          <EditableMap
            key={m.id}
            mapInfo={m}
            active={index === selectedIndex}
            onClick={() => this.setActiveIndex(index)}
            editable
            deletable
          />
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
  connect(mapStateToProps, mapDispatchToProps)
)(MapManagement);
