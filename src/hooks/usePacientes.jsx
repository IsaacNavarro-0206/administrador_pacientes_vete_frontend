import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

// Con useContext se hace disponible todo los valors que contenga el provider de auth
const usePacientes = () => {
  return useContext(PacientesContext);
};

export default usePacientes;
