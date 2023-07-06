
export function CollectedPlantsShow(props) {
 
  return (
    <div>
      <h1>Collected Plant</h1>
      <h2>{props.collectedPlant.nickname || 'Give your plant a nickname!'}</h2>
      <p>
        {props.collectedPlant.custom_image ? (
          <img className="round-image" src={props.collectedPlant.custom_image} alt="No image" />
        ) : (
          <img className="round-image" src={props.collectedPlant.img} alt="No image" />
        )}
      </p>
      <hr />
      <h3>Schedule</h3>

      <ul>{props.collectedPlant.schedule.watering_start_date}</ul>

      <hr />

      <h3>Notes</h3>
      <ul>{props.collectedPlant.notes}</ul>

      <hr />
      <h3> Details </h3>
      <ul>Common Name: {props.collectedPlant.common_name}</ul>
      <ul>Latin Name: {props.collectedPlant.latin_name}</ul>
      <ul>Category: {props.collectedPlant.category}</ul>
      <ul>Watering: {props.collectedPlant.watering}</ul>
      <ul>Ideal Light: {props.collectedPlant.light_ideal}</ul>
      <ul>Tolerated Light: {props.collectedPlant.light_tolerated}</ul>
      <ul>Climate: {props.collectedPlant.climate}</ul>
      <hr />
      <p><a href={props.collectedPlant.url}>Resource</a></p>
      
    </div>
  );
}
