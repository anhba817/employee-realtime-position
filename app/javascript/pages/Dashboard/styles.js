const styles = (theme) => ({
  menuContainer: {
    margin: 8,
    padding: 8,
    alignSelf: 'flex-end',
  },
  iconActive: {
    color: theme.palette.primary.main,
  },
  menuButton: {
    color: theme.palette.primary.main,
    textTransform: 'none',
  },
  buttonText: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 16,
  },
  container: {
    position: 'relative',
  },
});

export default styles;
