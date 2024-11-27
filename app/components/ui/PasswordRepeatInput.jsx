const PasswordRepeatInput = ({ passwordRepeat, setPasswordRepeat }) => {
  return (
    <div className="mb-5">
      <label
        htmlFor="passwordRepeat"
        className="block mb-2 text-md font-medium text-main-gray"
      >
        Repetir contraseña
      </label>
      <input
        type="password"
        id="passwordRepeat"
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
        className="bg-white gray-50 border border-black border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder="Escriba su contraseña"
        required
      />
    </div>
  );
};

export default PasswordRepeatInput;
