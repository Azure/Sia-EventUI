import React from 'react'
import RaisedButtonStyled from 'components/elements/RaisedButtonStyled'
import * as eventActions from 'actions/eventActions'

const EventFooter = ({pagination, dispatch}) => {
  const linkRange = 2
  const maxPagesToLinkTo = 2 * linkRange + 1
  const pagesForDirectLink = []
  for (var i = 0; i < maxPagesToLinkTo; i++) {
    pagesForDirectLink.push(pagination.page - linkRange + i)
  }
  const existingPagesForDirectLink = pagesForDirectLink.filter((page) => page > 1 && page < pagination.total)
  const needsLeadingDots = !pagesForDirectLink.includes(1)
  const needsFollowingDots = !pagesForDirectLink.includes(pagination.total)
  let localKey = 0
  return (
    <div className='incident-EventFooter'>
      {<RaisedButtonStyled key={localKey++} label='1' primary={pagination.page === 1} onTouchTap={() => dispatch(eventActions.pagination.goToPage(1))} />}
      {needsLeadingDots ? <span key={localKey++}>. . .</span> : null}
      {
            existingPagesForDirectLink.map(pageNumber =>
              <RaisedButtonStyled
                key={localKey++}
                label={pageNumber.toString()}
                primary={pageNumber === pagination.page}
                onTouchTap={() => dispatch(eventActions.pagination.goToPage(pageNumber))}
                />)
        }
      {needsFollowingDots ? <span key={localKey++}>. . .</span> : null}
      <RaisedButtonStyled key={localKey++} label={pagination.total} primary={pagination.page === pagination.total} onTouchTap={() => dispatch(eventActions.pagination.goToPage(pagination.total))} />
    </div>
  )
}

export default EventFooter
