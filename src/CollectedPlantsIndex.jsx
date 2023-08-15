import React from 'react';
import './CollectedPlants.css';

export function CollectedPlantsIndex({
  collectedPlants,
  onShowCollectedPlant,
  // onCreateSchedule,
}) {
  const handleImageClick = (collectedPlant) => {
    onShowCollectedPlant(collectedPlant);
  };

  // const renderSchedule = (collectedPlant) => {
  //   if (collectedPlant.schedule?.watering_start_date) {
  //     return (
  //       <>
  //         <p>Watering Schedule:</p>
  //         <p>{collectedPlant.schedule.watering_start_date}</p>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <p>
  //         <button onClick={() => onCreateSchedule(collectedPlant)}>
  //           Create Schedule
  //         </button>
  //       </p>
  //     );
  //   }
  // };

  const reversedCollectedPlants = [...collectedPlants].reverse();

  return (
    <div id="collected-plants-index">
      {reversedCollectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id} className="index-plant-container">
          <img
            className="index-image"
            src={collectedPlant.custom_image || collectedPlant.img}
            alt="No image"
            onClick={() => handleImageClick(collectedPlant)}
          />
          <div className="index-font">
            {collectedPlant.nickname || collectedPlant.common_name || collectedPlant.latin_name}
          </div>
          {/* {renderSchedule(collectedPlant)} */}
        </div>
      ))}
    </div>
  );
}

export default CollectedPlantsIndex;