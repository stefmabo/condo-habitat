import React from 'react'
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'

const Transition = props => <Slide direction="up" {...props} />

const FullScreen = ({
  children,
  onRequestClose,
  onSubmit,
  isShow,
  title,
  onDestroyModal,
}) => (
  <Dialog
    onExited={onDestroyModal}
    fullScreen
    fullWidth
    open={isShow}
    onClose={onRequestClose}
    TransitionComponent={Transition}
  >
    <AppBar style={{ position: 'fixed' }}>
      <Toolbar
        className="d-flex align-items-center justify-content-between"
        disableGutters
      >
        <div className="d-flex align-items-center">
          <IconButton
            color="inherit"
            onClick={onRequestClose}
            aria-label="Close"
          >
            <i className="material-icons">keyboard_backspace</i>
          </IconButton>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </div>
        <Button
          color="inherit"
          onClick={onSubmit}
          className="text-capitalize pr-4 text-center"
          centerRipple
        >
          Guardar
        </Button>
      </Toolbar>
    </AppBar>
    <div className="container-fluid pt-6 position-relative">{children}</div>
  </Dialog>
)

export default FullScreen
