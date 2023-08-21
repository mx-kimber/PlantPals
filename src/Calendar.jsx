import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css'; 
import axios from 'axios';


class Calendar extends React.Component {
  state = {
    selectedYear: new Date().getFullYear(),
  };

  handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    this.setState({ selectedYear: newYear }, () => {
      const calendarApi = this.calendarRef.getApi();
      calendarApi.gotoDate(`${newYear}-01-01`);
    });
  };
  
  handleDrop = async (event) => {
    event.preventDefault();
  
    const data = event.dataTransfer.getData('application/json');
    
    const { collectedPlantId, currentUserId } = JSON.parse(data);
  
    console.log("Collected Plant ID:", collectedPlantId);
    console.log("Current User ID:", currentUserId);
  
    const droppedDate = this.calendarRef.getApi().getDate();
    console.log("Dropped Date:", droppedDate);
  
    const formattedDate = droppedDate.toISOString().replace('T', ' ').replace('Z', ' UTC +00:00');
    console.log("Formatted Date:", formattedDate);
  
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

  handleEventDrop = async (eventDropInfo) => {
    const { event } = eventDropInfo;

    const newStart = event.start;

    const updatedSchedule = {
      id: event.id,
      watering_start_date: newStart,
    };

    console.log("Updating schedule:", updatedSchedule);

    try {
      const response = await axios.put(`http://localhost:3000/schedules/${event.id}.json`, updatedSchedule);
      console.log("Schedule updated successfully:", response.data);
      
    } catch (error) {
      console.error("Error updating schedule:", error);
      console.log('params', updatedSchedule);
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
          onDrop={this.handleDrop}
          onDragOver={(e) => e.preventDefault()}>
          <div className="year-dropdown-container">
            <label>Select Year: </label>
            <select value={this.state.selectedYear} onChange={this.handleYearChange}>
              {Array.from({ length: new Date().getFullYear() - 1949 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )).reverse()}
            </select>
          </div>
            <FullCalendar
              ref={(ref) => (this.calendarRef = ref)}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: 'prev today next',
                center: 'title',
                end: 'dayGridMonth timeGridWeek timeGridDay',
              }}
              
              height={400}
              weekends={true}
              editable={true}
              droppable={true}
              drop={this.handleDrop}
              eventDrop={this.handleEventDrop}
              events={schedules.map((schedule) => ({
                id: schedule.id,
                title: schedule.collected_plant.nickname || schedule.collected_plant.latin_name,
                start: new Date(schedule.watering_start_date),
                // allDay: true,
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
