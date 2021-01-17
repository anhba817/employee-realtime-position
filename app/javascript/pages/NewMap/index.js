import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import MapEditor from '../../components/MapEditor/index';
import AnchorsEditor from '../../components/AnchorsEditor/index';
import styles from "./styles";

const steps = ["Upload floor map", "Add anchors"];

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
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      openEditDialog: false,
    };
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    return (
      <div>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {getStepContent(activeStep)}
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Button
              disabled={activeStep === 0}
              onClick={this.handleBack}
              className={classes.button}
              variant="contained"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

NewMap.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(NewMap);
