import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function CollectedPlantsShow(props) {
  const navigate = useNavigate();

  const handleEdit = () => {
    props.onClose();
    navigate(`/collected_plants/${props.collectedPlant.id}`);
  };

  const handleEditSchedule = () => {
    props.onClose();
    navigate(`/schedule/${props.collectedPlant.schedule.id}`);
  };

  return (
    <div>
      <h1>Collected Plant</h1>
      <h2>{props.collectedPlant.nickname || 'Give your plant a nickname!'}</h2>
      <p>
        {props.collectedPlant.custom_image ? (
          <img src={props.collectedPlant.custom_image} alt="No image" />
        ) : (
          <img src={props.collectedPlant.img} alt="No image" />
        )}
      </p>

      <h3>Schedule</h3>

      <p>{props.collectedPlant.schedule.watering_start_date}</p>

      <hr />

      <h3>Notes</h3>
      <p>{props.collectedPlant.notes}</p>

      <hr />

      <li>Common Name: {props.collectedPlant.common_name}</li>
      <li>Latin Name: {props.collectedPlant.latin_name}</li>
      <li>Category: {props.collectedPlant.category}</li>
      <li>Watering: {props.collectedPlant.watering}</li>
      <li>Ideal Light: {props.collectedPlant.light_ideal}</li>
      <li>Tolerated Light: {props.collectedPlant.light_tolerated}</li>
      <li>Climate: {props.collectedPlant.climate}</li>
      <li>
        Resource: <a href={props.collectedPlant.url}>{props.collectedPlant.url}</a>
      </li>

      <button onClick={handleEdit}>Collected Plant Settings</button>

      <Link to={`/collected_plants/${props.collectedPlant.id}/edit_schedule`}>
        <button onClick={handleEditSchedule}>Edit Schedule</button>
      </Link>
    </div>
  );
}
