import React from 'react'
import { renderComponentWithMap } from '../../utils'

class Subscription extends React.Component {
  componentDidMount() {
    this.props.subscribe()
  }

  render() {
    const {
      list = [],
      isHidden,
      component,
      subscribe,
      ...parameters
    } = this.props

    return (
      !isHidden &&
      list.map(
        renderComponentWithMap(component, 'id', {
          ...parameters,
        }),
      )
    )
  }
}

export default Subscription
