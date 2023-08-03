import React from 'react'

export function CollectedPlantEdit(props) {

  const handleSubmit = (event) => {
      event.preventDefault();
      const params = new FormData(event.target);
      props.onUpdateCollectedPlant(props.collectedPlant.id, params, () => event.target.reset());
    };

    // const handleClick = () => {
    //   props.onDestroyCollectedPlant(props.collectedPlant);
    // };

  return (
    <div>
      <h2>Edit Collected Plant</h2>
      <form onSubmit={handleSubmit}>
         <div>
           Nickname: <input defaultValue={props.collectedPlant.nickname} name="nickname" type="text" />
         </div>
         <div>
           Image: <input defaultValue={props.collectedPlant.custom_image} name="custom_image" type="text" />
         </div>
         <div>
           Notes: <input defaultValue={props.collectedPlant.notes} name="notes" type="text" />
         </div>
         
         <button type="submit">Update</button>
       </form>

       {/* <button onClick={handleClick}>Destroy Collected Plant</button> */}

    </div>
  )
}

export default CollectedPlantEdit