const NameInput = ({ name, setName }) => {
  return (
    <div className="mb-5">
      <label
        htmlFor="name"
        className="block mb-2 text-md font-medium text-main-gray"
      >
        Nombre
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-white gray-50 border border-black border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder="Escriba su nombre"
        required
      />
    </div>
  );
};

export default NameInput;
