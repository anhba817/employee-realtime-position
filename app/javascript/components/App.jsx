import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as mapActions from "../actions/map";
import { CSRF_LOCAL_STORAGE_ID } from "../constants/common";
import { ROUTES } from "./routes";
import theme from "./theme";
import Admin from "../layouts/Admin/index";
import GlobalLoading from "../components/GlobalLoading/index";

class App extends Component {
  componentDidMount() {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    localStorage.setItem(
      CSRF_LOCAL_STORAGE_ID,
      JSON.stringify({ csrf_token: token })
    );
    const { mapActionCreators } = this.props;
    mapActionCreators.getAllMaps();
  }

  renderRoutes = (routs) => {
    let result = null;
    if (routs.length > 0) {
      result = routs.map((route, index) => {
        const { path, exact, component } = route;
        return (
          <Route key={index} path={path} exact={exact}>
            <Admin>{component()}</Admin>
          </Route>
        );
      });
    }
    return result;
  };

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>{this.renderRoutes(ROUTES)}</Switch>
          <ToastContainer />
          <GlobalLoading />
        </ThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  mapActionCreators: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapActionCreators: bindActionCreators(mapActions, dispatch),
  };
};

export default compose(connect(null, mapDispatchToProps))(App);
