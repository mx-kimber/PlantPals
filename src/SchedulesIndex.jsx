export function SchedulesIndex(props) {
  return (
    <div>
      <h1>All Schedules</h1>
      {props.schedules.map((schedule) => (
        <div key={schedule.id}>
          <h2>{schedule.collected_plant.nickname || schedule.collected_plant.common_name || schedule.collected_plant.latin_name}</h2>
          <p>Days to Water: {schedule.days_to_water}</p>
          <p>Watering Start Date: {schedule.watering_start_date}</p>
            <p>{schedule.collected_plant.watering}</p>
            <button onClick={() => props.onShowSchedule(schedule)}>Edit Schedule</button>
        </div>
      ))}
    </div>
  );
}
