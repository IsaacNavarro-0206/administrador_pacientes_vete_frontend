import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Con useContext se hace disponible todo los valors que contenga el provider de auth
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
