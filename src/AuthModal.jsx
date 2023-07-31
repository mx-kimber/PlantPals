import "./AuthModal.css";

export function AuthModal(props) {
  if (props.show) {
    return (
      <div className="auth-modal-background">
        <section className="auth-modal-main">
          {props.children}
        </section>
      </div>
    );
  }
}