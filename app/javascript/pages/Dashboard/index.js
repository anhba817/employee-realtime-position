import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListItemText from "@material-ui/core/ListItemText";
import RealtimePosition from "../../components/RealtimePosition/index";
import styles from "./styles";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0,
    };
  }

  handleOpenMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleCloseMenu = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({
      anchorEl: null,
      selectedIndex: index,
    });
  };

  render() {
    const { anchorEl, selectedIndex } = this.state;
    const { classes, maps } = this.props;
    if (maps.length > 0) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <div className={classes.menuContainer}>
            <Button
              onClick={this.handleOpenMenu}
              className={classes.menuButton}
              variant="contained"
            >
              <ListItemAvatar>
                <Avatar
                  alt={maps[selectedIndex].name}
                  src={maps[selectedIndex].image.url}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                className={classes.buttonText}
                primary={maps[selectedIndex].name}
              />
              <ArrowDropDownIcon />
            </Button>
          </div>
          <RealtimePosition map={maps[selectedIndex]} />
          <Menu
            id="customized-menu"
            anchorEl={anchorEl}
            elevation={0}
            getContentAnchorEl={null}
            keepMounted
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(anchorEl)}
            onClose={this.handleCloseMenu}
          >
            {maps.map((map, index) => (
              <MenuItem
                key={map.id}
                selected={index === selectedIndex}
                onClick={(event) => this.handleMenuItemClick(event, index)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={map.name}
                    src={map.image.url}
                    variant="square"
                  />
                </ListItemAvatar>
                <ListItemText primary={map.name} />
              </MenuItem>
            ))}
          </Menu>
        </div>
      );
    } else {
      return <div>No maps found</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    maps: state.maps,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, null)
)(Dashboard);
