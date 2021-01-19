import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
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

class NewMap extends Component {

  render() {
    const { classes, activeMapAddingStep } = this.props;
    return (
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
    );
  }
}

NewMap.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    activeMapAddingStep: state.ui.activeMapAddingStep,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, null)
)(NewMap);
