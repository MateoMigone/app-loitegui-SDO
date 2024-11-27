const PasswordInput = ({ password, setPassword }) => {
  return (
    <div className="mb-5">
      <label
        htmlFor="password"
        className="block mb-2 text-md font-medium text-main-gray"
      >
        Constraseña
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white gray-50 border border-black border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder="Escriba su contraseña"
        required
      />
    </div>
  );
};

export default PasswordInput;
