import React from 'react'
import AppBar from 'material-ui/AppBar'
import NavMenu from 'components/TopNav/NavMenu'
import NavNotifs from 'components/TopNav/NavNotifs'

export const TopNav = () => {
  return <AppBar title='SRE Incident Assistant'
    iconElementLeft={<NavMenu />}
    iconElementRight={<NavNotifs />} />
}

export default TopNav
