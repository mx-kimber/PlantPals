export function PlantsShow(props) {
  return (
    <div>
      <h1>Plant information</h1>
      <p>{props.plant.img}</p>
      <p>Common Name: {props.plant.common_name}</p>
      <p>Latin Name: {props.plant.latin_name}</p>
      <p>Category: {props.plant.category}</p>
      <p>Watering: {props.plant.watering}</p>
      <p>Ideal light: {props.plant.light_ideal}</p>
      <p>Tolerated Light: {props.plant.light_tolerated}</p>
      <p>Climate: {props.plant.climate}</p>
      <p>Resource: <a href={props.plant.url}>{props.plant.url}</a></p>

    </div>
  );
}

