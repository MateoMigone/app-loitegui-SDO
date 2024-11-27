const EmailInput = ({ email, setEmail }) => {
  return (
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block mb-2 text-md font-medium text-main-gray"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white gray-50 border border-black border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder="Escriba su email"
        required
      />
    </div>
  );
};

export default EmailInput;
