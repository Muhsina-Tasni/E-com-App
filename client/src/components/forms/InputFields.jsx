const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  ...rest 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...rest} 
      />
    </div>
  );
};

export default InputField;
