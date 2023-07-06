import { useState, useEffect } from "react";
import axios from "axios"
import { useParams } from "react-router-dom"

export function CollectedPlantShowSeparate() {
  const [collectedPlant, setCollectedPlant] = useState({})
  const params = useParams();
  const getShowCollectedPlant = () => {
    console.log(params.id);
    console.log('getting individual collected plant');
    axios.get(`http://localhost:3000/collected_plants/${params.id}.json`)
.then(response => {
      console.log(response.data)
      setCollectedPlant(response.data)
    })
  }  

  useEffect(getShowCollectedPlant, [])

  return (
    <div id="collected-plants-show-separate">
      <p>id: {collectedPlant.id}</p>
      <h1>collected Plant</h1>
      <h2>{collectedPlant.nickname || 'Give your plant a nickname!'}</h2>
      <p>
        {collectedPlant.custom_image ? (
          <img src={collectedPlant.custom_image} alt="No image" />
        ) : (
          <img className="rounded-image" src={collectedPlant.img} alt="No image" />
        )}
      </p>
      <hr />
      <h3>Schedule</h3>

      {/* <ul>{collectedPlant.schedule.watering_start_date}</ul> */}

      <hr />

      <h3>Notes</h3>
      <ul>{collectedPlant.notes}</ul>

      <hr />
      <h3> Details </h3>
      
      <ul>Common Name: {collectedPlant.common_name}</ul>
      <ul>Latin Name: {collectedPlant.latin_name}</ul>
      <ul>Category: {collectedPlant.category}</ul>
      <ul>Watering: {collectedPlant.watering}</ul>
      <ul>Ideal Light: {collectedPlant.light_ideal}</ul>
      <ul>Tolerated Light: {collectedPlant.light_tolerated}</ul>
      <ul>Climate: {collectedPlant.climate}</ul>
      <hr />
      <p><a href={collectedPlant.url}>Resource</a></p>
      
    </div>
  )
}
