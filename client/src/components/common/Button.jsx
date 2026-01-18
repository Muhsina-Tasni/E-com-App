const Button = ({
  children,
  type = "button",
  onClick,
  ...rest 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;