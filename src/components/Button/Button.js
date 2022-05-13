import "./styles.scss";

export const Button = ({ text, onClick, type = "primary", styles }) => {
  return (
    <button onClick={onClick} className={`button ${type} ${styles}`}>
      {text}
    </button>
  );
};
