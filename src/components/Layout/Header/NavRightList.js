import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import { withRouter } from 'react-router-dom'

class NavRightList extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    // console.log( event)
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <ul className="list-unstyled float-right">
        <li className="list-inline-item search-box seach-box-right d-none d-md-inline-block" />
        <li style={{ marginRight: '10px' }}>
          <IconButton
            className="header-btn"
            aria-owns={anchorEl ? 'app-header-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Avatar
              alt="avatar"
              src="assets/images-demo/g1.jpg"
              className="rounded-circle header-avatar"
            />
          </IconButton>

          <Menu
            id="app-header-menu"
            className="app-header-dropdown"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          />
        </li>
      </ul>
    )
  }
}

export default withRouter(NavRightList)
