import "./styles.scss";

export const Input = ({
  placeholder,
  value = "",
  name,
  onChange = () => {},
  required,
  type,
}) => {
  return (
    <div className="input">
      <span>{placeholder}</span>
      <input
        className="input input_box"
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        type={type}
        autoComplete="off"
      />
    </div>
  );
};
