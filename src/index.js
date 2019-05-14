import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore, { history } from './store/configureStore'
import Root from './components/Root'
import registerServiceWorker from './serviceWorker'
import { initializeFirebase } from './push-notification'

const store = configureStore()

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root'),
)

registerServiceWorker()
initializeFirebase()
