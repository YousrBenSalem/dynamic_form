// FormBuilder.js
import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { FaTrash, FaSave } from "react-icons/fa";

const FormBuilder = () => {
  // États pour gérer les champs du formulaire, le nom du formulaire, le mode de construction, et l'index du champ sélectionné

  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [isBuilderMode, setBuilderMode] = useState(false);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  // Fonction pour ajouter un champ au formulaire

  const addFieldToForm = (type, label) => {
    console.log("Type:", type);
    console.log("Label:", label);
    setFormFields([...formFields, { type, label }]);
  };
  // Fonction pour activer le mode d'édition pour un champ spécifique

  const handleEditField = (index) => {
    // Mettez à jour l'état pour activer le mode d'édition pour l'élément spécifique
    setBuilderMode(true);
    setSelectedFieldIndex(index);
  };
  // Fonction pour supprimer un champ du formulaire

  const handleDeleteField = (index) => {
    // Supprimez l'élément du tableau des champs de formulaire
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };
  // Fonction pour ajouter un champ au formulaire

  const handleAddField = () => {
    setFormFields([...formFields, { type: "NEW_TYPE", label: "New Label" }]);
  };
  // Fonction pour déplacer un champ lors du glisser-déposer

  const moveField = (dragIndex, hoverIndex) => {
    const draggedField = formFields[dragIndex];
    const updatedFields = [...formFields];
    updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, draggedField);
    setFormFields(updatedFields);
  };
  // Effet pour charger les formulaires existants lors du chargement du composant

  useEffect(() => {
    handleViewForms();
  }, []);
  // Utilisation du hook useDrop pour permettre le glisser-déposer des éléments sur le composant

  const [, drop] = useDrop({
    accept: [
      "HEADING",
      "DESCRIPTION",
      "SINGLE_LINE",
      "NUMBER",
      "CHECKLIST",
      "MULTICHOICE",
      "DROPDOWN",
      "COMBOBOX",
      "CHECKBOX",
      "SWITCH",
      "DATE",
      "DATE_RANGE",
      "TIME",
    ],
    // Fonction hover pour gérer le glisser-déposer

    hover(item) {
      if (!formFields.find((field) => field.type === item.type)) {
        addFieldToForm(item.type, item.label);
        item.index = formFields.length - 1;
      }
    },
  });
  // Fonction pour effacer le formulaire actuel

  const handleClearForm = () => {
    setFormName("");
    setFormFields([]);
  };
  // Fonction pour visualiser les formulaires existants depuis le serveur

  const handleViewForms = async () => {
    try {
      const response = await fetch(" http://localhost:8080/api/forms").then(
        function (response) {
          return response.json();
        }
      );

      if (response.ok) {
        try {
          const forms = await response.json();
          console.log(forms);
        } catch (error) {
          console.error(`Error parsing JSON response: ${error}`);
        }
      } else {
        const errorText = await response.text();
        console.error(`Failed to fetch forms: ${errorText}`);
      }
    } catch (error) {
      console.error("Error fetching forms", error);
    }
  };
  // Fonction pour sauvegarder le formulaire actuel sur le serveur

  const handleSaveForm = async () => {
    try {
      console.log("Trying to save the form...");

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ formName, formFields }),
      });
      console.log("Response:", response);

      if (response.ok) {
        console.log("Form saved successfully");
        // Vous pouvez également gérer la mise à jour de l'état ou effectuer d'autres actions ici
      } else {
        const errorText = await response.text();
        console.error(`Failed to save form: ${errorText}`);
      }
    } catch (error) {
      console.error("Error saving form", error);
    }
  };
  // Retour du JSX représentant le formulaire

  return (
    <div style={{ padding: "20px", width: "1000px" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          alignContent: "space-between",
        }}
      >
        <div>
          Form Name :
          <input
            type="text"
            placeholder="Enter form name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        </div>
      </div>
      <div
        style={{
          border: "1px dashed #ccc",
          minHeight: "100%",
          width: "1000px",
        }}
        ref={drop}
      >
        {formFields.map((field, index) => (
          <div key={index}>
            <FormBuilderField
              index={index}
              type={field.type}
              label={field.label}
              moveField={moveField}
              isBuilderMode={isBuilderMode}
            />
            <button onClick={() => handleAddField(index)}>Add Field</button>
            <button onClick={() => handleDeleteField(index)}>
              Delete Field
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          marginLeft: "600px",
          marginBottom: "20px",
        }}
      >
        <button onClick={handleClearForm} style={{ marginRight: "100px" }}>
          <FaTrash /> Clear Form
        </button>
        <button onClick={handleSaveForm}>
          <FaSave /> Save Form
        </button>
      </div>
    </div>
  );
};

const FormBuilderField = ({ index, type, label, moveField, isBuilderMode }) => {
  const [, drop] = useDrop({
    accept: [
      "HEADING",
      "DESCRIPTION",
      "SINGLE_LINE",
      "NUMBER",
      "CHECKLIST",
      "MULTICHOICE",
      "DROPDOWN",
      "COMBOBOX",
      "CHECKBOX",
      "SWITCH",
      "DATE",
      "DATE_RANGE",
      "TIME",
    ],

    hover(item) {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={drop} style={{ marginBottom: "8px" }}>
      {type === "HEADING" && <h3>{label}</h3>}
      {type === "DESCRIPTION" && <p>{label}</p>}
      {type === "SINGLE_LINE" && (
        <input type="text" placeholder={label} readOnly={!isBuilderMode} />
      )}
      {type === "NUMBER" && <input type="number" readOnly={!isBuilderMode} />}
      {type === "CHECKLIST" && (
        <div>
          <input type="checkbox" readOnly={!isBuilderMode} />
          <label>{label}</label>
        </div>
      )}
      {type === "MULTICHOICE" && (
        <div>
          <input type="radio" readOnly={!isBuilderMode} />
          <label>{label}</label>
        </div>
      )}
      {type === "DROPDOWN" && (
        <div>
          <label>{label}</label>
          <select disabled={!isBuilderMode}>
            {/* Add options dynamically based on your data */}
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      )}
      {type === "COMBOBOX" && (
        <div>
          <label>{label}</label>
          <input type="text" readOnly={!isBuilderMode} />
        </div>
      )}
      {type === "CHECKBOX" && (
        <div>
          <input type="checkbox" readOnly={!isBuilderMode} />
          <label>{label}</label>
        </div>
      )}
      {type === "SWITCH" && (
        <div>
          <label>{label}</label>
          <label
            style={{
              position: "relative",
              display: "inline-block",
              width: "60px",
              height: "34px",
            }}
          >
            <input type="checkbox" disabled={!isBuilderMode} />
            <span></span>
          </label>
        </div>
      )}

      {type === "DATE" && <input type="date" readOnly={!isBuilderMode} />}
      {type === "DATE_RANGE" && (
        <div>
          <input type="date" readOnly={!isBuilderMode} /> -{" "}
          <input type="date" readOnly={!isBuilderMode} />
        </div>
      )}
      {type === "TIME" && <input type="time" readOnly={!isBuilderMode} />}
    </div>
  );
};

export default FormBuilder;
