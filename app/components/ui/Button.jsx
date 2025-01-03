const Button = ({ text, color, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`flex items-center justify-center gap-2 text-white w-full font-medium rounded-lg text-md px-5 mb-3 mt-5 ${
        color ? color : "bg-main-green"
      }`}
    >
      {children}
      <span
        className={`${
          children ? "tracking-wider font-light mb-0.5 text-[15px]" : "py-2.5"
        }`}
      >
        {text}
      </span>
    </button>
  );
};

export default Button;
