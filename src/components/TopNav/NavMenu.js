import React from 'react'
import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import { Link } from 'react-router-dom'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import { onLogoutActions } from '../../actions/authActions'

export const mapStateToProps = (state) => {
    return {
        alias: state.auth.userAlias
    }
}

export const NavMenu = ({dispatch, alias}) =>
<IconMenu
    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
>
    <MenuItem primaryText={ alias }/>
    <MenuItem primaryText={<Link to="/" >Incident Search</Link>} />
    <MenuItem primaryText={<Link to="/" onClick={() => dispatch(onLogoutActions)}>LogOut</Link>} />
    <MenuItem primaryText={<Link to="/debug" >Debug</Link>} />
</IconMenu>


export default connect(mapStateToProps)(NavMenu)