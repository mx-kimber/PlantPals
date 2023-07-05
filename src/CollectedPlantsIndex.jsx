import React from 'react';
import { Link } from 'react-router-dom';

export function CollectedPlantsIndex({
  collectedPlants,
  onShowCollectedPlant,
  onEditCollectedPlant,
  onShowSchedule,
}) {
  const handleEditCollectedPlant = (collectedPlant) => {
    onEditCollectedPlant(collectedPlant);
  };

  const handleShowSchedule = (schedule) => {
    onShowSchedule(schedule);
  };

  return (
    <div id="collected-plants-index">
      <h1>Plant Collection</h1>
      {collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          <h2>{collectedPlant.nickname || collectedPlant.common_name || collectedPlant.latin_name}</h2>

          <Link to={`/collected_plants/${collectedPlant.id}`}><img
            src={collectedPlant.custom_image || collectedPlant.img}
            alt="No image"
            onClick={() => onShowCollectedPlant(collectedPlant)}
          /></Link>

          <p>Watering: {collectedPlant.watering}</p>
          <p>Notes: {collectedPlant.notes}</p>

          <button onClick={() => onShowCollectedPlant(collectedPlant)}>
            All info
          </button>

          <button onClick={() => handleEditCollectedPlant(collectedPlant.id)}>
            Plant Settings
          </button>

          <Link to={`/collected_plants/${collectedPlant.id}`}>
            <button>Settings</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
