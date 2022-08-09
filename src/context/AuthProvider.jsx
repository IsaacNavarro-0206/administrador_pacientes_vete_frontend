import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

// Con children se define que los componentes que estén encerrados por AuthProvider son hijos de este último
const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      // Si no hay un token se detiene la ejecución del código
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/veterinarios/perfil", config);

        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");

    // Si no hay un token se detiene la ejecución del código
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.put(
        `/veterinarios/perfil/${datos._id}`,
        datos,
        config
      );

      return { msg: "Almacenado correctamente" };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  };

  const actualizarPassword = async (datos) => {
    const token = localStorage.getItem("token");

    // Si no hay un token se detiene la ejecución del código
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.put(
        "/veterinarios/actualizar-password",
        datos,
        config
      );

      return { msg: data.msg };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  };

  // Con value se definen cuales son los valores que estrán disponibles para los componentes hijos
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        actualizarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
