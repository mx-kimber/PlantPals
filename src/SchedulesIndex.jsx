export function SchedulesIndex(props) {
  return (
    <div>
      <h1>All Schedules</h1>
      {props.schedules.map((schedule) => (
        <div key={schedule.id}>
          <h2>{schedule.collected_plant.nickname}</h2>
          <p>Days to Water: {schedule.days_to_water}</p>
          <p>Watering Start Date: {schedule.watering_start_date}</p>
            <p><img src={schedule.collected_plant.img} alt="Plant Image" /></p>
        </div>
      ))}
    </div>
  );
}
