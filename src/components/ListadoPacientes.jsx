import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  console.log(pacientes);

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="text-center text-3xl font-black">
            Listado de pacientes
          </h2>

          <p className="text-center text-xl mt-5 mb-10">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">pacientes y citas</span>
          </p>

          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="text-center text-3xl font-black">No hay pacientes</h2>

          <p className="text-center text-xl mt-5 mb-10">
            Comienza agregando pacientes {""}
            <span className="text-indigo-600 font-bold">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
