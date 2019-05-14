import React from 'react'

export const renderComponentWithMap = (Component, key, newParameters) => (
  item,
  index,
) => {
  let props = { ...item }

  if (typeof item !== 'object') {
    props = { name: item }
  }

  return (
    <Component key={props[key]} {...props} {...newParameters} index={index} />
  )
}

// Subscriptions

export const updateItem = (
  subscribeToMore,
  graphQLSubscription,
  objectToUpdate,
) => {
  subscribeToMore({
    document: graphQLSubscription,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev

      const newArray = [...prev[objectToUpdate]]
      const index = newArray.findIndex(i => i.id === subscriptionData.id)
      newArray[index] = subscriptionData
      return { [objectToUpdate]: newArray }
    },
  })
}

// End Subscriptions

export const debounce = (fn, time) => {
  let timeout

  return function() {
    const functionCall = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

export const isDesktop = width => ['lg', 'xl'].includes(width)
