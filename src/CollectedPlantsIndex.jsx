import React from 'react';
import { Link } from 'react-router-dom';

export function CollectedPlantsIndex(props) {
  return (
    <div id="collected-plants-index">
      <h1>Plant Collection</h1>
      {props.collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          <h2>
            {collectedPlant.nickname || 'Give your plant a nickname!'}
          </h2>
          <p>
            {collectedPlant.custom_image ? (
              <img src={collectedPlant.custom_image} alt="No image" />
            ) : (
              <img src={collectedPlant.img} alt="No image" />
            )}
          </p>

          <p>Latin Name: {collectedPlant.latin_name}</p>
          <p>Watering: {collectedPlant.watering}</p>
          <p>Notes: {collectedPlant.notes}</p>
          
          <button onClick={() => props.onShowCollectedPlant(collectedPlant)}>All info</button>

          <button onClick={() => props.onEditCollectedPlant(true)}>Plant Settings</button>

          <Link to={`/collected_plants/${collectedPlant.id}`}>
            <button onClick={() => handleEdit(collectedPlant.id)}>Settings</button>
          </Link>
        </div>
      ))}
    </div>
  );
}











  