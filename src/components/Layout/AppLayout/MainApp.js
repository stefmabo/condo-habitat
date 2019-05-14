import React from 'react'
import { Route } from 'react-router-dom'
import loadable from 'react-loadable'
import Header from 'components/Layout/Header'
import Sidenav from 'components/Layout/Sidenav'
import Footer from 'components/Layout/Footer'
import LoadingComponent from 'components/Loading'

import { withIsConnected } from 'enhancers'

import { ModalProvider } from '../../common/Modal/ModalContext'
import SnackbarError from '../../common/SnackbarError'

let VisitList = loadable({
  loader: () => import('components/VisitList/'),
  loading: LoadingComponent,
})

class MainApp extends React.Component {
  render() {
    return (
      <div className="main-app-container">
        <Sidenav />

        <section id="page-container" className="app-page-container">
          <SnackbarError
            isOpen={!this.props.isConnected}
            message="No hay conexión a Internet"
          />
          <Header />

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="h-100">
                <div className="container-fluid mt-3">
                  <ModalProvider>
                    <Route exact path="/" component={VisitList} />
                  </ModalProvider>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </section>
      </div>
    )
  }
}

export default withIsConnected(MainApp)
