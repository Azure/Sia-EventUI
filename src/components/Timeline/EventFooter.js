import React from 'react'
import RaisedButtonStyled from '../elements/RaisedButtonStyled'

const EventFooter = () => {
  return (
      <div className="incident-EventFooter">
          <RaisedButtonStyled label="Prev" />&nbsp;
          <RaisedButtonStyled label="1" primary={true} />&nbsp;
          <RaisedButtonStyled label="2" />&nbsp;
          <RaisedButtonStyled label="3" />&nbsp;
          <RaisedButtonStyled label="4" />&nbsp;
          &nbsp; . . . &nbsp;&nbsp;
          <RaisedButtonStyled label="10" />&nbsp;
          <RaisedButtonStyled label="next" />
      </div>
  )
}

export default EventFooter