const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="text-white bg-main-green w-full font-medium rounded-lg text-sm px-5 py-2.5 mb-3 mt-5"
    >
      {text}
    </button>
  );
};

export default Button;
