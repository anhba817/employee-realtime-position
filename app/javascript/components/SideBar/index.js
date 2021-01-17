import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import { ROUTES } from "../routes";
import styles from "./styles";

class Sidebar extends Component {
  links = (routes) => {
    const { classes, match, color } = this.props;
    return (
      <List className={classes.list}>
        {routes.map((route, key) => {
          if(! route.listed) {
            return null;
          }
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: match.path === route.path,
          });
          const listItemClasses = classNames({
            [" " + classes[color]]: match.path === route.path,
          });
          return (
            <NavLink
              to={route.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof route.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {route.icon}
                  </Icon>
                ) : (
                  <route.icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  />
                )}
                <Tooltip title={route.tooltip}>
                  <ListItemText
                    primary={route.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography
                  />
                </Tooltip>
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    );
  };

  brand = () => {
    const { classes, logo, logoText } = this.props;
    return (
      <div className={classes.logo}>
        <span className={classNames(classes.logoLink)}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          <span>{logoText}</span>
        </span>
      </div>
    );
  };

  render() {
    const { image, classes, handleDrawerToggle, open } = this.props;
    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.brand()}
            <div className={classes.sidebarWrapper}>{this.links(ROUTES)}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="persistent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {this.brand()}
            <div className={classes.sidebarWrapper}>{this.links(ROUTES)}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  color: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  open: PropTypes.bool,
  classes: PropTypes.object,
  match: PropTypes.object,
};

export default withStyles(styles)(withRouter(Sidebar));
