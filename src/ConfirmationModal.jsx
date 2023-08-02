import React from "react";
import "./ConfirmationModal.css";

export function ConfirmationModal(props) {
  if (props.show && props.plant) {
    return (
      <div className="confirm-modal-background">
        <section className="confirm-modal-main">
          <h2>Awesome! You collected another plant!</h2>
          <img src={props.plant.img} alt="Collected Plant" />
        </section>
      </div>
    );
  } else {
    return null;
  }
}
