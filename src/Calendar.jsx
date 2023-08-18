import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css'; 
import axios from 'axios';

class Calendar extends React.Component {
  handleDrop = async (event) => {
    event.preventDefault();
  
    const data = event.dataTransfer.getData('application/json');
    
    const { collectedPlantId, currentUserId } = JSON.parse(data);
  
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace('T', ' ').replace('Z', ' UTC +00:00'); //placeholder date
  
    const newSchedule = {
      collected_plant_id: collectedPlantId,
      watering_start_date: formattedDate,
      user_id: currentUserId,
      // days_to_water: , <--save for later
    };
  
    console.log("Creating new schedule:", newSchedule);
  
    try {
      const response = await axios.post("http://localhost:3000/schedules.json", newSchedule);
      console.log("Schedule created successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating schedule:", error);
      console.log('params', newSchedule);
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
