import "./styles.scss";

export const Input = ({
  placeholder,
  value = "",
  name,
  onChange = () => {},
}) => {
  return (
    <div className="input">
      <span>{placeholder}</span>
      <input
        className="input input_box"
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
