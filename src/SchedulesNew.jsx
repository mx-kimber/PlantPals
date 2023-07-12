export function SchedulesNew(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateSchedule(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>New Schedule</h1>
      <form onSubmit={handleSubmit} >
        <div>
          user id: <input name="user_id" type="integer" />
        </div>
        <div>
          collected plant id: <input name="collected_plant_id" type="text" />
        </div>
        <div>
          days to water: <input name="days_to_water" type="text" />
        </div>
        <div>
          Watering Start Date: <input name="watering_start_date" type="datetime-local" />
        </div>

        <button type="submit">Create Schedule</button>
      </form>
    </div>
  );
}