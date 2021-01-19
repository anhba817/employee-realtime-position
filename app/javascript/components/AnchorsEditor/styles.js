const styles = (theme) => ({
  gridItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  gridItemText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  image: {
    padding: 0,
    position: "relative",
  },
  imageActive: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },
  anchorList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
});

export default styles;