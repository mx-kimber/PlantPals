import React, { useState } from 'react';

export function PlantsIndex(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const { plants } = props;
  const filteredPlants = plants
  .filter(
    (plant) =>
      plant.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.latin_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.category.toLowerCase().includes(searchTerm.toLowerCase()))
  
  .sort((a, b) => a.common_name.localeCompare(b.common_name))
    .slice(0, 3);

  return (
    <div>
      <h1>All Plants</h1>
  
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search plants..."
      />

      {filteredPlants.map((plant) => (
        <div key={plant.id}>
          <h2>{plant.common_name}</h2>
          <img src={plant.img} alt={plant.common_name} />
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

