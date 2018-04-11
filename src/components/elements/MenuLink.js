import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionLabel from 'material-ui/svg-icons/action/label'

const styles = {
  constrainedWidth: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '25rem'
  }
}

export const MenuLink = ({type, id, title, onClick, dispatch}) => {
  let typeRoute = `/${type}s/${id}`
  let menuItemKey = `${type}-${id}`

  return (
    <div title={title}>
      <MenuItem
        key={menuItemKey}
        containerElement={<Link to={typeRoute} />}
        primaryText={ticketPrimaryText(id, title)}
        leftIcon={<ActionLabel />}
        rightIcon={<ActionDelete onClick={() => dispatch(onClick(id))} />}
      />
    </div>
  )
}

const ticketPrimaryText = (id, title) => {
  const ticketText = `${id} ${title ? '-' : ''} ${title}`

  return (<div style={styles.constrainedWidth}>{ticketText}</div>)
}

MenuLink.propTypes = {
  primaryText: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  rightIcon: PropTypes.object
}

export default MenuLink
