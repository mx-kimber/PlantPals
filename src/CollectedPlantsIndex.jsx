import React from 'react';

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

          <p>Common Name: {collectedPlant.common_name}</p>
          <p>Latin Name: {collectedPlant.latin_name}</p>
          <p>Image: {collectedPlant.img}</p>
          <p>Watering: {collectedPlant.watering}</p>
          <p>Ideal Light: {collectedPlant.light_ideal}</p>
          <p>Tolerated Light: {collectedPlant.light_tolerated}</p>
          <p>Climate: {collectedPlant.climate}</p>
          <p>Category: {collectedPlant.category}</p>
          <p>URL: <a href={collectedPlant.url}>{collectedPlant.url}</a></p>

        </div>
      ))}
    </div>
  );
}










  