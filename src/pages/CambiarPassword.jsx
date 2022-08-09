import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const { actualizarPassword } = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    passwordActual: "",
    passwordNuevo: "",
  });
  const [repetirPassword, setRepetirPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { passwordNuevo } = password;

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (passwordNuevo.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener más de 6 carácteres",
        error: true,
      });
      return;
    }

    if (passwordNuevo !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    const passwordActualizado = await actualizarPassword(password);
    setAlerta(passwordActualizado);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar contraseña
      </h2>

      <p className="text-center text-xl mt-5 mb-10">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">contraseña aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}

            <div className="my-3">
              <label
                htmlFor="passwordActual"
                className="uppercase font-bold text-gray-600"
              >
                Contraseña actual
              </label>
              <input
                id="passwordActual"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Tu contraseña actual"
                name="passwordActual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="passwordNuevo"
                className="uppercase font-bold text-gray-600"
              >
                Contraseña nueva
              </label>
              <input
                id="passwordNuevo"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Tu contraseña nueva"
                name="passwordNuevo"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="repetirPassword"
                className="uppercase font-bold text-gray-600"
              >
                Repetir contraseña nueva
              </label>
              <input
                id="repetirPassword"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Repite la contraseña nueva"
                name="repetirPassword"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Actualizar contraseña"
              className="cursor-pointer uppercase bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 w-full font-bold rounded-lg mt-5"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
