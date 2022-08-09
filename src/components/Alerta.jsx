const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "from-red-500 to-red-700"
          : "from-indigo-500 to-indigo-700"
      } bg-gradient-to-br text-center font-bold text-white uppercase p-3 mb-2 rounded-xl text-sm`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
