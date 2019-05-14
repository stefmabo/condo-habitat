import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const Confirm = ({
  content,
  isShow,
  children,
  title = 'Información',
  maxWidth = 'sm',
  fullWidth = false,
  onDestroyModal,
}) => (
  <Dialog
    onExited={onDestroyModal}
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={isShow}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      <span className="color-primary">{title}</span>
    </DialogTitle>
    <DialogContent>{content}</DialogContent>
    {children}
  </Dialog>
)

export default Confirm
