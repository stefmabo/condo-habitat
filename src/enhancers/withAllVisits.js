import React from 'react'
import { Query } from 'react-apollo'

import AllVisits from 'graphql/AllVisits'

export default function withAllVisits(Component) {
  return function(props) {
    return (
      <div>
        <Query query={AllVisits} fetchPolicy="cache-and-network">
          {({ data = { visits: [] }, loading, subscribeToMore, error }) => {
            return (
              <Component
                {...props}
                visits={data.visits}
                loading={loading}
                subscribeToMore={subscribeToMore}
                error={error}
              />
            )
          }}
        </Query>
      </div>
    )
  }
}
