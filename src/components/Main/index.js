// index.js

// Importation des bibliothèques nécessaires
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FormBuilder from "./FormBuilder";

// Définition du composant principal Index
const Index = () => {
  // Retour du JSX représentant la structure de la page
  return (
    // Utilisation de DndProvider pour activer le glisser-déposer avec le backend HTML5
    <DndProvider backend={HTML5Backend}>
      <div>
        {/* Composant Navbar pour la barre de navigation */}
        <Navbar />
        <div style={{ display: "flex" }}>
          {/* Composant Sidebar pour la barre latérale contenant les éléments de formulaire */}
          <Sidebar />
          {/* Composant FormBuilder pour la construction du formulaire */}
          <FormBuilder />
        </div>
      </div>
    </DndProvider>
  );
};

// Exportation du composant Index
export default Index;
