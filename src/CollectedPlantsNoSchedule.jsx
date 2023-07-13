import React from 'react';
import './Index.css';

export function CollectedPlantsNoSchedule({
  collectedPlants,
  onCreateSchedule,
}) {

  const collectedPlantsNoSchedule = collectedPlants.filter(
    (collectedPlant) => !collectedPlant.schedule.id
  );

  return (
    <div id="collected-plants-no-schedules-index">
      <h1>Plants Without Schedules</h1>
      {collectedPlantsNoSchedule.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          <h2>{collectedPlant.nickname || collectedPlant.common_name || collectedPlant.latin_name}</h2>
          <img
            className="rounded-image"
            src={collectedPlant.custom_image || collectedPlant.img}
            alt="No image"
          />
          <p>
            <button onClick={() => onCreateSchedule(collectedPlant)}>
            Create Schedule
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}


export default CollectedPlantsNoSchedule;