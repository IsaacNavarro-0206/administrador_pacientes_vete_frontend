import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const { setEdicion, eliminarPaciente } = usePacientes();

  const { email, fechaDeAlta, nombre, propietario, sintomas, _id } = paciente;

  const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha);

  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Especificamos UTC para evitar ajustes
  };

  return new Intl.DateTimeFormat("es-CO", opciones).format(nuevaFecha);
};

  return (
    <div className="bg-white mx-5 my-10 px-5 py-10 rounded-xl shadow-md">
      <p className="font-bold uppercase text-indigo-700 my-2">
        Nombre: {""}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>

      <p className="font-bold uppercase text-indigo-700 my-2">
        Propietario: {""}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>

      <p className="font-bold uppercase text-indigo-700 my-2">
        Email: {""}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>

      <p className="font-bold uppercase text-indigo-700 my-2">
        Sintomas: {""}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <p className="font-bold uppercase text-indigo-700 my-2">
        Fecha de alta: {""}
        <span className="font-normal normal-case text-black">
          {formatearFecha(fechaDeAlta)}
        </span>
      </p>

      <div className="flex justify-between my-5">
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-white py-2 px-10 uppercase"
          onClick={() => setEdicion(paciente)}
        >
          Editar
        </button>

        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white py-2 px-10 uppercase"
          onClick={() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
