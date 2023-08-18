import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css'; 

class Calendar extends React.Component {
  state = {
    collectedPlants: [],
  };

handleDrop = (event) => {event.preventDefault();

  const collectedPlantId = event.dataTransfer.getData('text/plain');
  const currentDate = new Date();
  currentDate.setHours(8, 0, 0, 0);

  const newSchedule = {
    collected_plant: collectedPlantId,
    watering_start_date: currentDate.toISOString(),
    // need to pass the currentUser here. Global user state or collectedPlant.user_id
  };

  console.log("Creating new schedule:", newSchedule);
  this.props.onCreateSchedule(newSchedule, () => {
    window.location.reload();
  });
};

  handleDateClick = (arg) => {
    const calendarApi = this.calendarRef.getApi();
    calendarApi.changeView('timeGridDay', arg.dateStr);
  };

  render() {
    const { schedules } = this.props;

    return (
      <div className="calendar-container">
        <div
        className="collected-plants-drop-area"
          onDrop={this.handleDrop} 
          onDragOver={(e) => e.preventDefault()}>
            <FullCalendar
              ref={(ref) => (this.calendarRef = ref)}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: 'prev today next',
                center: 'title',
                end: 'dayGridMonth timeGridWeek timeGridDay',
              }}
              weekends={true}
              editable={true}
              droppable={true}
              drop={this.handleDrop}
              events={schedules.map((schedule) => ({
                id: schedule.id,
                title: schedule.collected_plant.nickname || schedule.collected_plant.latin_name,
                start: new Date(schedule.watering_start_date),
                allDay: true,
                // collectedPlantId: schedule.collected_plant.id,
              }))}
              dateClick={this.handleDateClick}
              eventClick={(arg) => {
              // note: handle showing schedule info (collectedPlant)
              // open edit modal?
            }}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
