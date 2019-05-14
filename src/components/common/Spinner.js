import React from 'react'

import { CircularProgress } from '@material-ui/core'

const Spinner = () => (
  <div className="d-flex align-items-center justify-content-center">
    <CircularProgress thickness={5} size={20} />{' '}
    <b className="pl-3 color-grey">...Cargando</b>
  </div>
)

export default Spinner
