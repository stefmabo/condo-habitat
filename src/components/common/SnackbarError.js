import React from 'react'
import classNames from 'classnames'
import { Snackbar, SnackbarContent, withStyles } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const SnackbarError = ({ message, classes, isOpen }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isOpen}
  >
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <i
            className={`material-icons ${classNames(
              classes.icon,
              classes.iconVariant,
            )}`}
          >
            cloud_off
          </i>
          {message}
        </span>
      }
    />
  </Snackbar>
)

export default withStyles(styles)(SnackbarError)
