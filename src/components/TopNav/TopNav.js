import React from 'react'
import AppBar from 'material-ui/AppBar'
import NavMenu from './NavMenu'
import NavNotifs from './NavNotifs'

export const TopNav = () => {
    return <AppBar title="SRE Incident Assistant"
            iconElementLeft={<NavMenu />}
            iconElementRight={<NavNotifs />}/>
}

export default TopNav
