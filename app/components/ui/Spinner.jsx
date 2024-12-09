const Spinner = () => {
  return (
    <div className="grid grid-rows-[1fr] items-center min-h-screen w-full justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="inline-block h-[60px] w-[60px] animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-main-brown"
          role="status"
        ></div>
        <p className="text-main-brown text-lg">Cargando...</p>
      </div>
    </div>
  );
};

export default Spinner;
