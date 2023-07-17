export function CollectedPlantsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log('handleSubmit params:', params);
    props.onCreateCollectedPlant(params, () => event.target.reset());
    // window.location.reload();
  };
  
  return (
    <div>
      <h1>New Collected Plant</h1>
      <form onSubmit={handleSubmit}>
       
        <div>
          Plant ID: <input name="plant_id" type="text" required />
        </div>
        <div>
          Nickname: <input name="nickname" type="text"/>
        </div>
        <div>
          Notes: <textarea name="notes" />
        </div>
        <div>
          Custom Image: <input name="custom_image" type="text" />
        </div>
        <button type="submit">Create Collected Plant</button>
      </form>
    </div>
  );
}
