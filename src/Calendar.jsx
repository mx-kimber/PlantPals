import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

export default class Calendar extends React.Component {

  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={this.handleDateClick}
      />
    )
  }

  handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

}