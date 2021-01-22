import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as mapActions from "../../actions/map";
import * as edittingMapActions from "../../actions/edittingMap";
import styles from "./styles";
import EditableMap from "../../components/EditableMap/index";
import Button from "@material-ui/core/Button";
import AddLocationTwoToneIcon from "@material-ui/icons/AddLocationTwoTone";

class MapManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    const { edittingMapActionCreators } = this.props;
    edittingMapActionCreators.clearEdittingMap();
  }

  setActiveIndex = (index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, maps, history } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddLocationTwoToneIcon />}
          onClick={() => history.push("/maps/new")}
          style={{ margin: 16, marginLeft: 8 }}
        >
          Add new map
        </Button>
        <div className={classes.container}>
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
    mapActionCreators: bindActionCreators(mapActions, dispatch),
    edittingMapActionCreators: bindActionCreators(edittingMapActions, dispatch),
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapManagement);
