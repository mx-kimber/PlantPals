export function SchedulesIndex(props) {
  return (
    <div>
      <h3>All Schedules</h3>
      {props.schedules.map((schedule) => (
        <div key={schedule.id}>
          <h2>
            {schedule.collected_plant.nickname ||
              schedule.collected_plant.common_name ||
              schedule.collected_plant.latin_name}
          </h2>
          <p>
            {schedule.collected_plant.custom_image ? (
              <img
                className="round-image"
                src={schedule.collected_plant.custom_image}
                alt="No image"
              />
            ) : (
              <img
                className="round-image"
                src={schedule.collected_plant.img}
                alt="No image"
              />
            )}
          </p>
          <p>Days to Water: {schedule.days_to_water}</p>
          <p>Watering Start Date: {schedule.watering_start_date}</p>
          <p>{schedule.collected_plant.watering}</p>
          <button onClick={() => props.onShowSchedule(schedule)}>
            Edit Schedule
          </button>
        </div>
      ))}
    </div>
  );
}
