// Importations depuis react-router-dom
import { Route, Routes, Navigate } from "react-router-dom";

// Importations des composants React
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyForms from "./components/Main/MyForms";

// Fonction principale du composant App
function App() {
  // Récupération du token depuis le stockage local
  const user = localStorage.getItem("token");

  // Retourne une structure de route basée sur la présence ou l'absence de l'utilisateur
  return (
    <Routes>
      {/* Affiche la page Main si l'utilisateur est connecté */}
      {user && <Route path="/" exact element={<Main />} />}

      {/* Page d'inscription */}
      <Route path="/signup" exact element={<Signup />} />

      {/* Page de connexion */}
      <Route path="/login" exact element={<Login />} />

      {/* Redirection vers la page de connexion si aucune correspondance */}
      <Route path="/" element={<Navigate replace to="/login" />} />

      {/* Page de formulaire de l'utilisateur connecté */}
      <Route path="/my-forms" element={<MyForms />} />
    </Routes>
  );
}

// Exportation du composant App
export default App;
