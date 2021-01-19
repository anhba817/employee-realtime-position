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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  imageButton: {
    padding: 0,
    flex: 2,
  },
  backgroundButton: {
    width: '100%',
    height: 60,
    border: '1px dashed grey',
    flex: 2,
  },
  logoSwitchLabel: {
    fontSize: 10,
  },
  button: {
    marginRight: theme.spacing(1),
  },
});

export default styles;