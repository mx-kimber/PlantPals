export function PlantsIndex(props) {
  return (
    <div>
      <h1>All Plants</h1>
      {props.plants.map((plant) => (
        <div key={plant.id}>
          <h2>{plant.common_name}</h2>
          <img src={plant.img} />
          <p>Latin Name: {plant.latin_name}</p>
          <p>Watering: {plant.watering}</p>
          <p>Ideal Light: {plant.light_ideal}</p>
          <p>Category: {plant.category}</p>
          <button onClick={() => props.onShowPlant(plant)}>More info</button>
        </div>
      ))}
    </div>
  );
}
