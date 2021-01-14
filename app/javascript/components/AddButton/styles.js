const styles = (theme) => ({
  container: {
    flex: "0 0 33.3333%",
    maxWidth: "30%",
    minWidth: 200,
    height: "max-content",
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    margin: 15,
    padding: 20,
    position: 'relative',
    lineHeight: 24,
    cursor: 'pointer',
    borderRadius: 6,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.background.default}`,
    "& .hidden-button": {
      display: "none"
    },
    "&:hover .hidden-button": {
      display: "flex"
    },
    [theme.breakpoints.down("xs")]: {
      flex: "0 0 50%",
      maxWidth: "100%",
    },
  },
  media: {
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
  active: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },
});

export default styles;
