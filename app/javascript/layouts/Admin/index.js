import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import logo from "../../assets/images/reactlogo.png";
import bgImage from "../../assets/images/sidebar-2.jpg";
import Sidebar from "../../components/SideBar/index";
import Navbar from "../../components/NavBar/index";
import styles from "./styles";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      image: null,
    };
  }

  handleDrawerToggle = () => {
    this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }));
  };

  render() {
    const { classes, children } = this.props;
    const { mobileOpen } = this.state;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          logoText="DONG TAN NGUYEN"
          logo={logo}
          image={bgImage}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobileOpen}
          color="blue"
        />
        <PerfectScrollbar
          className={classes.mainPanel}
          options={{
            suppressScrollX: true,
            suppressScrollY: false,
          }}
        >
          <Hidden mdUp implementation="css">
            <Navbar handleDrawerToggle={this.handleDrawerToggle} />
          </Hidden>
          <div className={classes.content}>
            <div className={classes.container}>{children}</div>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object,
};

export default withStyles(styles)(Admin);
