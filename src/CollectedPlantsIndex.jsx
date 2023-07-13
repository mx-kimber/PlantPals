import React from 'react';
import './Index.css';

export function CollectedPlantsIndex({
  collectedPlants,
  onShowCollectedPlant,
  onEditCollectedPlant,
  onCreateSchedule,
}) {
  const handleImageClick = (collectedPlant) => {
    onShowCollectedPlant(collectedPlant);
  };

  const renderSchedule = (collectedPlant) => {
    if (collectedPlant.schedule?.watering_start_date) {
      return (
        <>
          <p>Watering Schedule:</p>
          <p>{collectedPlant.schedule.watering_start_date}</p>
        </>
      );
    } else {
      return (
       <p><button onClick={() => onCreateSchedule(collectedPlant)}>
          Create Schedule
        </button></p>
      );
    }
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
          {renderSchedule(collectedPlant)}
          <button onClick={() => onEditCollectedPlant(collectedPlant)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default CollectedPlantsIndex;