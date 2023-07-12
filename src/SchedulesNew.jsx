export function SchedulesNew(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log('handleSubmit params:', params);
    props.onCreateSchedule(params)
    window.location.reload();
  };

  return (
    <div>
  <h1>New Schedule</h1>
  <form onSubmit={handleSubmit}>
    <input type="hidden" name="user_id" value={props.collectedPlant.user_id} />
    <input type="hidden" name="collected_plant_id" value={props.collectedPlant.id} />

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