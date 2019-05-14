import React, { Component, Fragment } from 'react'
import { graphql, compose, Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import AllVisits from 'graphql/AllVisits'
import DeleteVisit from 'graphql/DeleteVisit'
import VisitAuthorizedSubscription from 'graphql/VisitAuthorizedSubscription'

import { Fab, withStyles, withWidth } from '@material-ui/core'

import { withModalContext, withError, withAllVisits } from 'enhancers'

import { isDesktop, updateItem, debounce } from 'utils'

//Components
import { ModalContext } from '../common/Modal/ModalContext'
import YesNo from '../common/Modal/YesNo'
import Subscription from '../common/Subscription'
import Spinner from '../common/Spinner'
import RowItem from './RowItem'
import VisitForm from '../VisitForm/'
import DialogContentText from '@material-ui/core/DialogContentText'
import AddNewVisit from './AddNewVisit'
import Filters from './Filters'
//End Components

import styles from './styles'

const AddButton = ({ onSubmit }) => (
  <div
    className="position-fixed"
    style={{ right: 20, bottom: 70 }}
    onClick={onSubmit}
  >
    <Fab color="primary" aria-label="Add">
      <i className="material-icons">add</i>
    </Fab>
  </div>
)

class VisitList extends Component {
  static contextType = ModalContext

  state = {
    status: '',
    search: '',
    realTimeSearch: '',
    date: null,
  }

  handleDeleteVisit = ({ id, fullName }) => () => {
    this.props.modal.showModal(YesNo, {
      content: (
        <DialogContentText>
          ¿Está seguro que desea eliminar a&nbsp;
          <b className="color-primary">{fullName}</b>?
        </DialogContentText>
      ),
      onSubmit: () => {
        this.props.mutate({
          variables: {
            id,
          },
          refetchQueries: [
            {
              query: AllVisits,
            },
          ],
        })
        this.props.modal.hideModal()
      },
    })
  }

  handleDateChange = date => {
    this.setState({ date })
  }

  handleSwitchStatus = status => () => {
    this.setState({ status })
  }

  handleSearch = () => {
    this.setState({ search: this.state.realTimeSearch })
  }

  handleRealTimeSearch = realTimeSearch => {
    this.setState({ realTimeSearch })

    this.updateSearch()
  }

  updateSearch = debounce(this.handleSearch, 1000)

  goToVisitForm = props => () => {
    this.setState({ realTimeSearch: '', status: '', search: '' })

    const {
      fullName,
      personId,
      carPlate = '',
      entryDate,
      active,
      id,
      details,
      goAlongWith,
    } = props || {}

    this.props.modal.showModal(VisitForm, {
      location: props && {
        state: {
          fullName,
          personId,
          carPlate: carPlate || '',
          entryDate,
          active,
          id,
          details: details || '',
          isAccompanied: Boolean(goAlongWith),
          goAlongWith,
        },
      },
      onDestroyModal: this.props.modal.onDestroyModal,
    })
  }

  handleSubscribe = subscribeToMore => () => {
    updateItem(subscribeToMore, VisitAuthorizedSubscription, 'visits')
  }

  render() {
    const { classes } = this.props
    const status = this.state.status ? { status: this.state.status } : {}
    const search = this.state.search ? { search: this.state.search } : {}
    const date = this.state.date ? { entryDate: this.state.date } : {}

    return (
      <Query
        query={AllVisits}
        variables={{
          ...status,
          ...search,
          ...date,
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data: { visits = [] }, loading, subscribeToMore, error }) => {
          return (
            <Fragment>
              <Filters
                handleSearch={this.handleRealTimeSearch}
                handleSwitchStatus={this.handleSwitchStatus}
                handleDateChange={this.handleDateChange}
                date={this.state.date}
                status={this.state.status}
                classes={classes}
                search={this.state.realTimeSearch}
              />

              <div className="d-flex flex-wrap">
                {isDesktop(this.props.width) && (
                  <AddNewVisit goToVisitForm={this.goToVisitForm} />
                )}

                <Subscription
                  list={visits}
                  component={RowItem}
                  subscribeToMore={subscribeToMore}
                  goToVisitForm={this.goToVisitForm}
                  showDeleteModal={this.handleDeleteVisit}
                  subscribe={this.handleSubscribe(subscribeToMore)}
                  isHidden={loading}
                />

                {loading && (
                  <div
                    className="pt-5 pt-md-0"
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Spinner />
                  </div>
                )}
              </div>
              {!isDesktop(this.props.width) && (
                <AddButton onSubmit={this.goToVisitForm(null)} />
              )}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  withRouter,
  withAllVisits,
  withError,
  withStyles(styles),
  graphql(DeleteVisit),
  withModalContext,
  withWidth(),
)(VisitList)
