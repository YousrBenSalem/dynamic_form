// Importations React et ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Importation du composant BrowserRouter de react-router-dom
import { BrowserRouter } from "react-router-dom";

// Importation des styles CSS
import "./index.css";

// Importation du composant principal App
import App from "./App";

// Création d'une racine ReactDOM à l'élément avec l'ID "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendu du composant principal (App) enveloppé dans le composant BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
