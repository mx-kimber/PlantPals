export function PlantsShow(props) {
  
  const handleCreateCollectedPlant = () => {
    const params = {
      plant_id: props.plant.id,
    };

    props.onCreateCollectedPlant(params, () => {
      // note to self: callback logic to open a confirmation modal here?
    });
  };

  return (
    <div>
      <h1>Plant information</h1>
      <img className="rounded-image" src={props.plant.img} alt="Plant" />
      <p>Common Name: {props.plant.common_name}</p>
      <p>Latin Name: {props.plant.latin_name}</p>
      <p>Category: {props.plant.category}</p>
      <p>Watering: {props.plant.watering}</p>
      <p>Ideal light: {props.plant.light_ideal}</p>
      <p>Tolerated Light: {props.plant.light_tolerated}</p>
      <p>Climate: {props.plant.climate}</p>
      <p>Resource: <a href={props.plant.url}>{props.plant.url}</a></p>
      <button onClick={handleCreateCollectedPlant}>Add to collection</button>
    </div>
  );
}
