import DashboardIcon from "@material-ui/icons/Dashboard";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import React from "react";
import Dashboard from "../pages/Dashboard/index";
import MapManagement from "../pages/MapManagement/index";

const ROUTES = [
  {
    path: "/",
    exact: true,
    name: "Realtime positions",
    icon: PersonPinCircleIcon,
    tooltip: "Employee realtime position",
    component: () => <Dashboard />,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: EditLocationIcon,
    tooltip: "Add/Edit floor maps",
    component: () => <MapManagement />,
    exact: true,
  },
];

export { ROUTES };
