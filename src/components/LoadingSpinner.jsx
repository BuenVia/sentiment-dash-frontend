export default function LoadingSpinner(props) {
  return (
    <div className="spinner-container">
      <h3>{props.message}</h3>
      <div className="spinner"></div>
    </div>
  );
}