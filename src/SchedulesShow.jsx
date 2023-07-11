import React from "react";

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

  return (
    <div>
      <h1>Schedules</h1>
      <h2>{schedule.collected_plant.nickname}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <p>{schedule.collected_plant.watering}</p>
          Watering Start Date{" "}
          <input defaultValue={schedule.watering_start_date} name="name" type="text" />
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
    