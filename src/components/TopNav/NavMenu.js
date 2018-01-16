import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import { Link } from 'react-router-dom'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import * as auth from '../../services/authNService'



export const NavMenu = dispatch =>
<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
>
    <MenuItem primaryText={<Link to="/search" >Incident Search</Link>} />
    <MenuItem primaryText={<Link to="/" onClick={() => dispatch(auth.logOut)}>LogOut</Link>} />
    <MenuItem primaryText={<Link to="/debug" >Debug</Link>} />
</IconMenu>

NavMenu.propTypes = {
    dispatch: PropTypes.func
}
export default connect()(NavMenu)
