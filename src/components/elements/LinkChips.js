import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'

import MenuItem from 'material-ui/MenuItem'


var transformIdToTicketLink = (id, index) =>
  <MenuItem
    key={'ticket-' + id + '-index-' + index}
    primaryText={<Link to={'/tickets/' + id} >{'Ticket ' + id}</Link>}
  />

const LinkChip = (id, index) => {
    <Chip
    key={'ticket-' + id + '-index-' + index}
    label={<Link to={'/tickets/' + id} >{'Ticket ' + id}</Link>}
    />
}

export default LinkChip