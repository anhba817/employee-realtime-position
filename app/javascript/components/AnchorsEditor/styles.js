const styles = (theme) => ({
  gridItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  gridItemText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  image: {
    padding: 0,
    position: "relative",
  },
  imageActive: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },
});

export default styles;