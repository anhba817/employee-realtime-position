import { Typography } from "@material-ui/core";
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
      featured_image: null,
    };
  }

  handleDrawerToggle = () => {
    this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }));
  };

  onImageChange = (event) => {
    this.setState({ featured_image: event.target.files[0] });
  };

  uploadImage = () => {
    const formData = new FormData();
    const token = document.querySelector('meta[name="csrf-token"]').content;
    formData.append("name", "Quan dao Nam Du");
    formData.append("ratio", 0.1);
    formData.append("image", this.state.featured_image);
    formData.append("width", 1200);
    formData.append("height", 700);
    fetch("http://localhost:3000/api/maps", {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
      },
      body: formData,
    }).catch((error) => console.log(error));
  };

  updateImage = () => {
    const formData = new FormData();
    formData.append("name", "Quan dao Nam Du updated");
    formData.append("ratio", 0.05);
    formData.append("featured_image", this.state.featured_image);
    fetch("http://localhost:3000/api/maps/6", {
      method: "DELETE",
      // body: formData
    }).catch((error) => console.log(error));
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
          <Navbar handleDrawerToggle={this.handleDrawerToggle} />
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
