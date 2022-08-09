import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaDeAlta, setFechaDeAlta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPacientes, paciente } = usePacientes();

  useEffect(() => {
    // Evitando el error con los inputs cuando se vuelven no controlados
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFechaDeAlta(paciente.fechaDeAlta);
      setSintomas(paciente.sintomas);

      // Identificar si se está editando o creando un nuevo registro
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, fechaDeAlta, sintomas].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    guardarPacientes({ nombre, propietario, email, fechaDeAlta, sintomas, id });
    setAlerta({ msg: "Guardado correctamente" });
    setNombre("");
    setPropietario("");
    setEmail("");
    setFechaDeAlta("");
    setSintomas("");
    setId("");
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="text-center text-3xl font-black">
        Administrador de pacientes
      </h2>

      <p className="text-center text-xl mt-5 mb-10">
        Añade tus pacientes y {""}
        <span className="text-indigo-600 font-bold">administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Nombre
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Nombre propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            placeholder="Email del propietario"
            type="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold"
            htmlFor="fechaDeAlta"
          >
            Fecha de alta
          </label>
          <input
            id="fechaDeAlta"
            type="date"
            className="border-2 w-full p-2 mt-2 rounded-md"
            value={fechaDeAlta}
            onChange={(e) => setFechaDeAlta(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los síntomas del paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? "Guardar cambios" : "Registrar paciente"}
          className="bg-indigo-600 p-3 w-full uppercase text-white font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>

      {msg && <Alerta alerta={alerta} />}
    </>
  );
};

export default Formulario;
