export function CollectedPlantsShow({ collectedPlant, onCreateSchedule }) {
  const wateringStartDate = collectedPlant.schedule?.watering_start_date;

  const renderSchedule = () => {
    if (collectedPlant.schedule?.watering_start_date) {
      return (
        <>
          <h3> SCHEDULE </h3>
          <ul>
            <li>Watering Start Date: {wateringStartDate}</li>
          </ul>
        </>
      );
    } else {
      return (
        <>
          <h3> SCHEDULE </h3>
          <p>
            <button onClick={() => onCreateSchedule(collectedPlant)}>
              Create Schedule
            </button>
          </p>
        </>
      );
    }
  };

  return (
    <div>
      <h1>COLLECTED PLANT</h1>
      <h2>{collectedPlant.nickname || 'Give your plant a nickname!'}</h2>
      <p>
        {collectedPlant.custom_image ? (
          <img className="round-image" src={collectedPlant.custom_image} alt="No image" />
        ) : (
          <img className="round-image" src={collectedPlant.img} alt="No image" />
        )}
      </p>
      <hr />

      <h3>NOTES</h3>
      <ul>{collectedPlant.notes}</ul>

      <hr />
      <h3> DETAILS </h3>
      <ul>Common Name: {collectedPlant.common_name}</ul>
      <ul>Latin Name: {collectedPlant.latin_name}</ul>
      <ul>Category: {collectedPlant.category}</ul>
      <ul>Watering: {collectedPlant.watering}</ul>
      <ul>Ideal Light: {collectedPlant.light_ideal}</ul>
      <ul>Tolerated Light: {collectedPlant.light_tolerated}</ul>
      <ul>Climate: {collectedPlant.climate}</ul>
      <hr />
      <p>
        <a href={collectedPlant.url}>Resource</a>
      </p>

      <hr />
      {renderSchedule()}
    </div>
  );
}
