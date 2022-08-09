import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <header className="bg-indigo-600 py-10">
      <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row">
        <h1 className="text-indigo-200 text-2xl font-bold text-center">
          Administrador de Pacientes de {""}
          <span className="font-black text-white">Veterinaria</span>
        </h1>

        <nav className="flex gap-4 flex-col items-center lg:flex-row mt-5 lg:mt-0">
          <Link to="/admin" className="text-white uppercase text-sm font-bold">
            Pacientes
          </Link>

          <Link to="/admin/perfil" className="text-white uppercase text-sm font-bold">
            Perfil
          </Link>

          <button
            type="button"
            onClick={cerrarSesion}
            className="text-white uppercase text-sm font-bold"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
