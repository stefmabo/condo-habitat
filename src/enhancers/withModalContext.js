import React from 'react'
import { ModalContext } from 'components/common/Modal/ModalContext'

export default function withModalContext(Component) {
  return function WrapperComponent(props) {
    return (
      <ModalContext.Consumer>
        {state => <Component {...props} modal={state} />}
      </ModalContext.Consumer>
    )
  }
}
