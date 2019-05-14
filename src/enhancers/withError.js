import React from 'react'

export default function withError(Component) {
  return function({ error, ...props }) {
    return error ? <p>Error...</p> : <Component {...props} />
  }
}
