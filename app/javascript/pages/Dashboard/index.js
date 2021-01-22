import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        To be implemented!
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Dashboard);
