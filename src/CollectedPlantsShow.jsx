import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export function CollectedPlantsShow(props) {
  const navigate = useNavigate();
  const handleEdit = () => {
    props.onClose();
    navigate(`/collected_plants/${props.collectedPlant.id}`);
  };
  return (
    <div>
      <h1>Collected Plant</h1>
      <p>
        {props.collectedPlant.custom_image ? (
          <img src={props.collectedPlant.custom_image} alt="No image" />
        ) : (
          <img src={props.collectedPlant.img} alt="No image" />
        )}
      </p>
      <p>{props.collectedPlant.nickname || 'Give your plant a nickname!'}</p>
      <p>Notes: {props.collectedPlant.notes}</p>
      <p>Common Name: {props.collectedPlant.common_name}</p>
      <p>Latin Name: {props.collectedPlant.latin_name}</p>
      <p>Category: {props.collectedPlant.category}</p>
      <p>Watering: {props.collectedPlant.watering}</p>
      <p>Ideal Light: {props.collectedPlant.light_ideal}</p>
      <p>Tolerated Light: {props.collectedPlant.light_tolerated}</p>
      <p>Climate: {props.collectedPlant.climate}</p>
      <p>Resource: <a href={props.collectedPlant.url}>{props.collectedPlant.url}</a></p>
      <Link to={`/collected_plants/${props.collectedPlant.id}`}>
      <button onClick={handleEdit}>Edit Collected Plant</button>
      </Link>
    </div>
  );
}
