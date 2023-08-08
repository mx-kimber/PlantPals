import React from "react";
import { format } from "date-fns";
export function SchedulesShow(props) {
  const { schedule } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateSchedule(schedule.id, params, () => event.target.reset());
  };
    
  const handleClick = () => {
    props.onDestroySchedule(schedule);
  };

  if (!schedule || !schedule.collected_plant) {
    return null;
  }

  const formattedWateringStartDate = format(new Date(schedule.watering_start_date), "yyyy-MM-dd'T'HH:mm");

  return (
    <div>
      <h1>Schedules</h1>
      <h2>{schedule.collected_plant.nickname}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <p>{schedule.collected_plant.watering}</p>
          Watering Start Date{" "}
          <input defaultValue={formattedWateringStartDate} name="watering_start_date" type="datetime-local" /> 
        </div>
        <div>
          Days to Water:{" "}
          <input defaultValue={schedule.days_to_water} name="days_to_water" type="text" />
        </div>
        <p>
          <button type="submit">Update Schedule</button>
        </p>
        <p>
          <button onClick={handleClick}>Destroy Schedule</button>
        </p>
      </form>
    </div>
  );
}
    