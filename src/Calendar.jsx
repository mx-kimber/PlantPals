import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

class Calendar extends React.Component {
  render() {
    const { schedules } = this.props;

    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev today next',
          center: 'title',
          end: 'dayGridMonth timeGridWeek timeGridDay',
        }}
        weekends={true}
        editable={true}
        events={schedules.map((schedule) => ({
          id: schedule.id,
          title: "Watering",
          start: new Date(schedule.watering_start_date),
          allDay: false,
        }))}
        dateClick={this.handleDateClick}
        eventClick={(arg) => {
          // note: handle showing schedule info (collectedPlant)
          // open edit modal?
        }}
      />
    );
  }

  handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

}

export default Calendar;