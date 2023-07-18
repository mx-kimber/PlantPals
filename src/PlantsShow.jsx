import React, { useState, useEffect } from 'react';

export function PlantsShow(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 4000;

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Plant information</h1>
      <img className="rounded-image" src={props.plant.img} alt="Plant" />
      <p>Common Name: {props.plant.common_name}</p>
      <p>Latin Name: {props.plant.latin_name}</p>
      <p>Category: {props.plant.category}</p>
      <p>Watering: {props.plant.watering}</p>
      <p>Ideal light: {props.plant.light_ideal}</p>
      <p>Tolerated Light: {props.plant.light_tolerated}</p>
      <p>Climate: {props.plant.climate}</p>
      <p>Resource: <a href={props.plant.url}>{props.plant.url}</a></p>
      <button onClick={props.onCreateCollectedPlant}>Add to collection</button>
    </div>
  );
}

