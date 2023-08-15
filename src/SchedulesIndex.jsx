import React from 'react';
import './Schedules.css';

export function SchedulesIndex(props) {
  return (
    <div>
      <h2>All Schedules</h2>
      {props.schedules.map((schedule) => (
        <div key={schedule.id} className="index-plant-container">
          <img
            className="sch-index-image"
            src={schedule.collected_plant.custom_image || schedule.collected_plant.img}
            alt="No image"
          />
          <h2 className="sch-index-font">
            {schedule.collected_plant.nickname ||
              schedule.collected_plant.common_name ||
              schedule.collected_plant.latin_name}
          </h2>
          <button onClick={() => props.onShowSchedule(schedule)}>
            Edit Schedule
          </button>
        </div>
      ))}
    </div>
  );
}
