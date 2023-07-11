import React from 'react';
import './Index.css';

export function CollectedPlantsIndex({
  collectedPlants,
  onShowCollectedPlant,
  onEditCollectedPlant,
  onShowSchedule
}) {

  const handleImageClick = (collectedPlant) => {
    onShowCollectedPlant(collectedPlant);
    onShowSchedule(collectedPlant.id)
  };

  return (
    <div id="collected-plants-index">
      <h1>Plant Collection</h1>
      {collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          
          <h2>{collectedPlant.nickname || collectedPlant.common_name || collectedPlant.latin_name}</h2>
          <img
            className="rounded-image"
            src={collectedPlant.custom_image || collectedPlant.img}
            alt="No image"
            onClick={() => handleImageClick(collectedPlant)}
          />
          <p>Schedule: {collectedPlant.schedule?.watering_start_date}</p>
          
          <button onClick={() => onEditCollectedPlant(collectedPlant)}>
            Edit
          </button>
          <button onClick={() => onShowSchedule(collectedPlant)}>Edit Schedule</button>
        </div>
      ))}
    </div>
  );
}

export default CollectedPlantsIndex;