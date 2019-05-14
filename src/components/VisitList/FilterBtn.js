import { Button } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'

const FilterBtn = ({ txt, conditional, onClick, style: { btn, active } }) => (
  <Button
    size="medium"
    disableFocusRipple
    onClick={onClick}
    className={classNames(conditional ? active : btn)}
  >
    {txt}
  </Button>
)

export default FilterBtn
