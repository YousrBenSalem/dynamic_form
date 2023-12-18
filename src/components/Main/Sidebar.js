// Importation des hooks React
import React, { useState, useEffect } from "react";

// Importation du hook de glisser-déposer de react-dnd
import { useDrag } from "react-dnd";

// Importation des icônes de réact
import {
  FaHeading,
  FaAlignLeft,
  FaListUl,
  FaCalendar,
  FaClock,
  FaSearch,
  FaCheckSquare,
} from "react-icons/fa";

// Composant DraggableElement
const DraggableElement = ({ type, label, icon }) => {
  // Utilisation du hook useDrag pour activer le glisser-déposer
  const [, drag] = useDrag({
    type, // Type de l'élément (utilisé pour le glisser-déposer)
    item: { type, label }, // Informations à transmettre lors du glisser-déposer
  });

  return (
    <div
      ref={drag} // Référence pour activer le glisser-déposer
      style={{
        padding: "10px",
        margin: "5px",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

// Composant SearchBar
const SearchBar = ({ setSearchTerm }) => {
  // Fonction pour gérer les changements dans la barre de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            border: "1px solid lightgray",
            borderRadius: "4px",
            width: "300%",
          }}
        >
          <FaSearch
            style={{ color: "gray", marginRight: "8px", fontSize: "20px" }}
          />
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            placeholder="Search Elements"
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

// Composant Sidebar
const Sidebar = () => {
  // États locaux pour gérer la barre de recherche et les éléments filtrés
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredElements, setFilteredElements] = useState([]);

  // Effet secondaire pour filtrer les éléments en fonction du terme de recherche
  useEffect(() => {
    const filtered = elements.filter((element) =>
      element.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredElements(filtered);
  }, [searchTerm]);

  // Exemple d'éléments statiques
  const elements = [
    { type: "HEADING", label: "Heading", icon: <FaHeading /> },
    { type: "DESCRIPTION", label: "Description", icon: <FaAlignLeft /> },
    { type: "SINGLE_LINE", label: "Single Line", icon: <FaAlignLeft /> },
    { type: "CHECKLIST", label: "Checklist", icon: <FaCheckSquare /> },
    { type: "MULTICHOICE", label: "Multichoice", icon: <FaListUl /> },
    { type: "DROPDOWN", label: "Dropdown", icon: <FaListUl /> },
    { type: "COMBOBOX", label: "Combobox", icon: <FaListUl /> },
    { type: "CHECKBOX", label: "Checkbox", icon: <FaListUl /> },
    { type: "SWITCH", label: "Switch", icon: <FaListUl /> },
    { type: "DATE", label: "Date", icon: <FaCalendar /> },
    { type: "DATE_RANGE", label: "Date Range", icon: <FaCalendar /> },
    { type: "TIME", label: "Time", icon: <FaClock /> },
  ];

  // Retour du JSX représentant la structure du composant
  return (
    <div
      style={{
        width: "400px",
        background: "white",
        padding: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h4>Form Elements</h4>
        <h6 style={{ color: "gray" }}>Drag elements to the right</h6>
        <SearchBar setSearchTerm={setSearchTerm} />
        {filteredElements.map((element) => (
          <DraggableElement
            key={element.type}
            type={element.type}
            label={element.label}
            icon={element.icon}
          />
        ))}
      </div>
    </div>
  );
};

// Exportation du composant Sidebar
export default Sidebar;
