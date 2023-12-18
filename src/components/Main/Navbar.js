// Importation de React et de Link depuis react-router-dom
import React from "react";
import { Link } from "react-router-dom";

// Définition du composant fonctionnel Navbar
const Navbar = () => {
  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    // Suppression du token de l'utilisateur du stockage local
    localStorage.removeItem("token");
    // Rechargement de la page
    window.location.reload();
  };

  // Retour du JSX représentant la structure du composant
  return (
    <nav
      style={{
        background: "white",
        color: "#E043A4",
        padding: "10px",
        textAlign: "center",
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #E043A4",
      }}
    >
      {/* Section de navigation avec deux divisions flexibles */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Partie gauche du navigateur avec le titre */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontStyle: "italic",
            fontFamily: "cursive",
            fontSize: 25,
            marginLeft: 100,
          }}
        >
          {/* Titre du site */}
          <span>Form Builder</span>
        </div>

        {/* Partie droite du navigateur avec les liens et les boutons */}
        <div style={{ marginRight: 100 }}>
          {/* Bouton "My forms" lié à la page "/my-forms" */}
          <Link to="/my-forms">
            {" "}
            <button
              style={{
                marginRight: "20px",
                color: "white",
                background: "#E043A4",
                border: "1px solid #E043A4",
                padding: "10px",
                borderRadius: "25%",
              }}
            >
              My forms
            </button>
          </Link>

          {/* Bouton de déconnexion avec l'appel à la fonction handleLogout */}
          <button
            style={{
              color: "#E043A4",
              background: "white",
              border: "1px solid #E043A4",
              padding: "10px",
              borderRadius: "25%",
            }}
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </div>
    </nav>
  );
};

// Exportation du composant Navbar
export default Navbar;
