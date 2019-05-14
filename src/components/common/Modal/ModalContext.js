import React, { Component, createContext } from 'react'

export const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {},
})

export class ModalProvider extends Component {
  showModal = (component, props = {}) => {
    this.setState({
      component,
      props,
      isShow: true,
    })
  }

  hideModal = () => {
    this.setState({
      isShow: false,
    })
  }

  onDestroyModal = () => {
    this.setState({
      component: null,
    })
  }

  state = {
    component: null,
    props: {},
    isShow: true,
    showModal: this.showModal,
    hideModal: this.hideModal,
    onDestroyModal: this.onDestroyModal,
  }

  render() {
    const Component = this.state.component
    return (
      <ModalContext.Provider value={this.state}>
        {Component && (
          <Component
            {...this.state.props}
            onRequestClose={this.hideModal}
            isShow={this.state.isShow}
          />
        )}
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}

export const ModalConsumer = ModalContext.Consumer
