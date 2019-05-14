import React from 'react'

export default function withLoading(Component) {
  return function({ loading, ...props }) {
    return loading ? <p>Loading...</p> : <Component {...props} />
  }
}
