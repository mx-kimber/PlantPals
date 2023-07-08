import React from 'react'

export function CollectedPlantEdit(props) {

  const handleSubmit = (event) => {
      event.preventDefault();
      const params = new FormData(event.target);
      props.onUpdateCollectedPlant(props.collectedPlant.id, params, () => event.target.reset());
    };

  return (
    <div>
      <h2>CollectedPlantEdit</h2>
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



    </div>
  )
}

export default CollectedPlantEdit