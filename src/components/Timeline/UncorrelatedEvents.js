import React from 'react'

import ApplyFilterOnMount from 'components/Timeline/Filter/ApplyFilterOnMount'
import Timeline from 'components/Timeline/Timeline'

export const UncorrelatedEvents = () => <ApplyFilterOnMount style={{padding: '16px'}}>
  <Timeline />
</ApplyFilterOnMount>

export default UncorrelatedEvents
