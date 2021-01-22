import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as edittingMapActions from "../../actions/edittingMap";
import * as uiActions from "../../actions/ui";
import AnchorsEditor from "../../components/AnchorsEditor/index";
import MapEditor from "../../components/MapEditor/index";
import styles from "./styles";

const steps = ["Upload new map", "Add anchors"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <MapEditor />;
    case 1:
      return <AnchorsEditor />;
    default:
      return <div>Unknown step</div>;
  }
}

class EditMap extends Component {
  componentDidMount() {
    const { match, edittingMapActionCreators, uiActionCreators } = this.props;
    edittingMapActionCreators.getAndSetEditingMap(match.params.id);
    uiActionCreators.setActiveMapAddingStep(0);
  };

  componentWillUnmount() {
    const { edittingMapActionCreators } = this.props;
    edittingMapActionCreators.clearEdittingMap();
  };

  render() {
    const { activeMapAddingStep, edittingMap } = this.props;
    return edittingMap.id !== "" ? (
      <div>
        <Stepper activeStep={activeMapAddingStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {getStepContent(activeMapAddingStep)}
      </div>
    ) : (
      <div>...................</div>
    );
  }
}

EditMap.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    edittingMap: state.edittingMap,
    activeMapAddingStep: state.ui.activeMapAddingStep,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    edittingMapActionCreators: bindActionCreators(edittingMapActions, dispatch),
    uiActionCreators: bindActionCreators(uiActions, dispatch),
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EditMap);
