// need to refactor the drag and drop function/ dragStart is not a function error

import React from 'react';
import "./Schedules.css";

export function CollectedPlantsNoSchedule({
  collectedPlants,
  onCreateSchedule,
  // onDragStart,
}) {
  const collectedPlantsNoSchedule = collectedPlants.filter(
    (collectedPlant) => !collectedPlant.schedule.id
  );

  return (
    <div id="collected-plants-no-schedules-index">
      <h3>Collected Plants needing schedules</h3>
      {collectedPlantsNoSchedule.map((collectedPlant) => (
        <div
          key={collectedPlant.id}
          className="index-plant-container"
          draggable="true"
          // onDragStart={(event) => onDragStart(event, collectedPlant)}
          data-plant-id={collectedPlant.id}
        >
          <img
            className="sch-index-image"
            src={collectedPlant.custom_image || collectedPlant.img}
            alt="No image"
          />
          <div className="sch-index-font">
            {collectedPlant.nickname || collectedPlant.common_name || collectedPlant.latin_name}
          </div>
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