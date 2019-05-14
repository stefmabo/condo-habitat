import React from 'react'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import Base from './Base'

const YesNo = ({ content, onRequestClose, onSubmit, isShow }) => (
  <Base content={content} isShow={isShow}>
    <DialogActions>
      <Button onClick={onRequestClose} color="primary">
        No
      </Button>
      <Button onClick={onSubmit} color="primary" autoFocus>
        Sí
      </Button>
    </DialogActions>
  </Base>
)

export default YesNo
