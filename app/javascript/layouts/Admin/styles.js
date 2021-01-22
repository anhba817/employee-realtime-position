import {
  drawerWidth,
  transition,
  container,
} from '../../assets/jss/material-dashboard-react';

const styles = (theme) => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '30px',
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      padding: '0px 15px',
    },
  },
  container: {
    marginTop: '10px',
    padding: '0px 15px',
  },
});

export default styles;
