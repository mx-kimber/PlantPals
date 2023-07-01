import { useState, useEffect } from "react";
import axios from "axios"
import { useParams } from "react-router-dom"

export function CollectedPlantsShowSeparate() {
  const [collectedPlant, setCollectedPlant] = useState({})
  const params = useParams();
  const getShowCollectedPlant = () => {
    console.log(params.id);
    console.log('getting collected plant');
    axios.get(`http://localhost:3000/collected_plants/${params.id}.json`).then(response => {
      console.log(response.data)
      setCollectedPlant(response.data)
    })
  }  

  useEffect(getShowCollectedPlant, [])
  return (
    <div>
      <h1>Collected Plant</h1>
      <p>ID: {collectedPlant.id}</p>
      <p>
        {collectedPlant.custom_image ? (
          <img src={collectedPlant.custom_image} alt="No image" />
        ) : (
          <img src={collectedPlant.img} alt="No image" />
        )}
      </p>
      <p>{collectedPlant.nickname || 'Give your plant a nickname!'}</p>
      <p>Notes: {collectedPlant.notes}</p>
      <p>Common Name: {collectedPlant.common_name}</p>
      <p>Latin Name: {collectedPlant.latin_name}</p>
      <p>Category: {collectedPlant.category}</p>
      <p>Watering: {collectedPlant.watering}</p>
      <p>Ideal Light: {collectedPlant.light_ideal}</p>
      <p>Tolerated Light: {collectedPlant.light_tolerated}</p>
      <p>Climate: {collectedPlant.climate}</p>
      <p>Resource: <a href={collectedPlant.url}>{collectedPlant.url}</a></p>
    </div>
  );
}
