import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import loadable from 'react-loadable'
import LoadingComponent from 'components/Loading'

// = styles =
// 3rd
import 'styles/bootstrap/bootstrap.scss'
// custom
import 'styles/layout.scss'
import 'styles/theme.scss'
import 'styles/ui.scss'

import lightTheme from './themes/lightTheme'

import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { updateClient } from '../push-notification'
import { baseUrlHTTP, baseUrlWebSocket } from '../const'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

const httpLink = createHttpLink({
  uri: baseUrlHTTP,
})

const wsLink = new WebSocketLink({
  uri: baseUrlWebSocket,
  options: {
    reconnect: true,
  },
})

export const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

export const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null,
})

const client = new ApolloClient({ link, cache })
updateClient(client)

let MainApp = loadable({
  loader: () => import('components/Layout/AppLayout/MainApp'),
  loading: LoadingComponent,
})

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={lightTheme}>
          <MuiPickersUtilsProvider
            utils={MomentUtils}
            locale="es"
            moment={moment}
          >
            <div id="app-inner">
              <div className="preloaderbar hide">
                <span className="bar" />
              </div>
              <div
                className={classnames('app-main h-100', {
                  'fixed-header': true,
                  'nav-collapsed': false,
                  'nav-behind': false,
                  'layout-boxed': false,
                })}
              >
                <MainApp />
              </div>
            </div>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
