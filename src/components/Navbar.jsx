
// Le composant Navbar fournit une 
// barre de navigation interactive avec un logo, 
// un accès rapide aux favoris et une option de basculement entre 
// le mode sombre et clair, tout en utilisant Redux pour la gestion de l'état global. 🚀

import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon, HeartIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../store/slices/uiSlice";

const Navbar = ({ darkMode }) => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10" />
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/favorites"
              className="block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <HeartIcon className="h-6 w-6 text-red-500" />
            </Link>

            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
