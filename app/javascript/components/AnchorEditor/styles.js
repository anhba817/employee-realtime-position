const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    marginTop: 8,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    justifyContent: 'space-between',
    position: 'relative',
  },
  coordinate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    marginTop: 8,
    marginLeft: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    width: 4,
    height: 4,
    borderRadius: '50%',
  },
});

export default styles;
