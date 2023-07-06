import React from 'react';
import { Link } from 'react-router-dom';
import './Index.css'

export function CollectedPlantsIndex({
  collectedPlants,
  onShowCollectedPlant,
  // onShowSchedule,

}) {
  
  return (
    <div id="collected-plants-index">
      <h1>Plant Collection</h1>
      {collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          
          <h2>{collectedPlant.nickname || collectedPlant.common_name || collectedPlant.latin_name}</h2>

          <Link to={`/collected_plants/${collectedPlant.id}`}>
            <img className="rounded-image" src={collectedPlant.custom_image || collectedPlant.img}
              alt="No image"
              // onClick={() =>onShowCollectedPlant(collectedPlant)}
            /> 
          </Link>

          <p>Schedule: {collectedPlant.schedule.watering_start_date}</p>
          
          <button onClick={() => onShowCollectedPlant(collectedPlant)}>
            All info
          </button>
        </div>
      ))}
    </div>
  );
}
