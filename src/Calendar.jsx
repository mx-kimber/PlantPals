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

  handleDrop = (info) => {
    const collectedPlantId = info.dataTransfer.getData('text/plain');
    const collectedPlant = this.props.collectedPlants.find(plant => plant.id === collectedPlantId);

    if (collectedPlant) {
      this.setState(prevState => ({
        collectedPlants: [...prevState.collectedPlants, collectedPlant],
      }));
    }
  };

  handleDateClick = (arg) => {
    const calendarApi = this.calendarRef.getApi();
    calendarApi.changeView('timeGridDay', arg.dateStr);
  };

  render() {
    const { schedules } = this.props;

    return (
      <div className="calendar-container">
        <div className="collected-plants-drop-area" 
        // flagging an issue here with drag and drop function
          onDrop={this.handleDrop} 
          onDragOver={e => e.preventDefault()}>
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
              events={schedules.map((schedule) => ({
                id: schedule.id,
                title: schedule.collected_plant.custom_name || schedule.collected_plant.latin_name,
                start: new Date(schedule.watering_start_date),
                allDay: false,
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