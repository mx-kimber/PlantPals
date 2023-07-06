export function SchedulesShow(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateSchedule(props.schedule.id, params, () => event.target.reset());
  };
    
  const handleClick = () => {
    props.onDestroySchedule(props.schedule);
  };

  return (
   <div>
    <h1>Schedules</h1>
    <h2>{props.schedule.collected_plant.nickname}</h2>
   
    <form onSubmit={handleSubmit}>
        <div> 
          <p>{props.schedule.collected_plant.watering}</p>
          Watering Start Date <input defaultValue={props.schedule.watering_start_date} name="name" type="text" />
        </div>
        <div> 
          Days to Water: <input defaultValue={props.schedule.days_to_water} name="days_to_water" type="text" />
        </div>
        <p><button type="submit">Update Schedule</button></p>
        <p><button onClick={handleClick}>Destroy Schedule</button></p>
      </form>
    </div>
  );
}

    