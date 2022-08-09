import clienteAxios from "../config/clienteAxios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/veterinarios/confirmar/${id}`);

        setCuentaConfirmada(true);
        console.log(cuentaConfirmada);
        setAlerta({ msg: data.msg });
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }

      // await fetch(`http://localhost:4000/veterinarios/confirmar/${id}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setCuentaConfirmada(true);
      //     setAlerta({ msg: data.msg });
      //   })
      //   .catch((error) => {
      //     setAlerta({ msg: error.response.data.msg, error: true });
      //   });

      setCargando(false);
    };

    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma Tu Cuenta y Empieza a Administrar Tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
