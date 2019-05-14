import React from 'react'

export default function withIsConnected(Component) {
  return class extends React.Component {
    state = {
      isConnected: navigator.onLine,
    }

    componentDidMount() {
      window.addEventListener('offline', this.handleState(false))

      window.addEventListener('online', this.handleState(true))
    }

    handleState = isConnected => () => {
      this.setState({ isConnected })
    }

    render() {
      return <Component {...this.props} isConnected={this.state.isConnected} />
    }
  }
}
