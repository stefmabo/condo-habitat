import React from 'react'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import Base from './Base'

const CancelSave = ({
  onRequestClose,
  onSubmit,
  isShow,
  children,
  fullWidth,
  onDestroyModal,
  title,
}) => (
  <Base
    content={children}
    isShow={isShow}
    fullWidth={fullWidth}
    onDestroyModal={onDestroyModal}
    title={title}
  >
    <DialogActions>
      <Button onClick={onRequestClose} color="primary">
        Cancelar
      </Button>
      <Button onClick={onSubmit} color="primary" autoFocus>
        Guardar
      </Button>
    </DialogActions>
  </Base>
)

export default CancelSave
