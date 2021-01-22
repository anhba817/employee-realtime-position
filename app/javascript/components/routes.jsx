import DashboardIcon from "@material-ui/icons/Dashboard";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import React from "react";
import Dashboard from "../pages/Dashboard/index";
import MapManagement from "../pages/MapManagement/index";
import NewMap from "../pages/NewMap/index";
import EditMap from "../pages/EditMap/index";

const ROUTES = [
  {
    path: "/",
    exact: true,
    name: "Realtime positions",
    icon: PersonPinCircleIcon,
    tooltip: "Employee realtime position",
    component: () => <Dashboard />,
    listed: true,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: EditLocationIcon,
    tooltip: "Add/Edit floor maps",
    component: () => <MapManagement />,
    exact: true,
    listed: true,
  },
  {
    path: "/maps/new",
    name: "Add new map",
    icon: EditLocationIcon,
    tooltip: "Add new floor map",
    component: () => <NewMap />,
    exact: true,
    listed: false,
  },
  {
    path: "/maps/edit/:id",
    name: "Edit map",
    icon: EditLocationIcon,
    tooltip: "Edit floor map",
    component: () => <EditMap />,
    exact: true,
    listed: false,
  },
];

export { ROUTES };
