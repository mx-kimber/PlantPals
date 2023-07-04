export function SchedulesShow(props) {
  return (

   <div>
      <h1>All Schedules</h1>
      <h2>{props.schedule.collected_plant.nickname}</h2>
      <p>Days to Water: {props.schedule.days_to_water}</p>
      <p>Watering Start Date: {props.schedule.watering_start_date}</p>
      <p><img src={props.schedule.collected_plant.img} alt="Plan Image" /></p>
    
    </div>
  );
}
    