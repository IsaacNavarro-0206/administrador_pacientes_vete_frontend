import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);

        setAlerta({ msg: "Coloca tu nueva contraseña" });

        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: "Hubo un error con el enlace", error: true });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es corta, debe tener más de 6 carácteres",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `veterinarios/olvide-password/${token}`,
        { password }
      );

      setAlerta({ msg: data.msg });

      setPasswordModificado(true);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece Tu Contraseña y No Pierdas Tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Contraseña nueva
                </label>
                <input
                  type="password"
                  placeholder="Ingresa la contraseña nueva"
                  name="password"
                  id="password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Repetir contraseña
                </label>
                <input
                  type="password"
                  placeholder="Repita la contraseña nueva"
                  name="repetirPassword"
                  id="repetirPassword"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={repetirPassword}
                  onChange={(e) => setRepetirPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Restablecer contraseña"
                className="bg-indigo-700 text-white w-full py-3 px-10 rounded-xl uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>

            {passwordModificado && (
              <Link to="/" className="block text-center my-5 text-gray-500">
                Inicia sesión
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
