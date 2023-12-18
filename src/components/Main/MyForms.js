// MyForms.js
import React, { useEffect, useState } from "react";

// Composant MyForms
const MyForms = () => {
  // État local pour stocker les formulaires
  const [forms, setForms] = useState([]);

  // Effet de côté pour charger les formulaires depuis l'API
  useEffect(() => {
    // Fonction asynchrone pour effectuer la requête vers l'API
    const fetchForms = async () => {
      try {
        // Appel à l'API pour récupérer la liste des formulaires
        const response = await fetch("/api/forms");

        // Vérification de la réussite de la requête
        if (response.ok) {
          // Extraction des données JSON de la réponse
          const formsData = await response.json();
          // Mise à jour de l'état local avec les formulaires récupérés
          setForms(formsData);
        } else {
          // Affichage d'une erreur en cas d'échec de la requête
          console.error("Failed to fetch forms");
        }
      } catch (error) {
        // Affichage d'une erreur en cas d'erreur lors de la requête
        console.error("Error fetching forms", error);
      }
    };

    // Appel de la fonction fetchForms lors du montage du composant
    fetchForms();
  }, []); // La dépendance vide indique que l'effet doit être exécuté une seule fois au montage

  // Retour du JSX représentant la structure du composant
  return (
    <div>
      {/* Titre de la page */}
      <h2>My Forms</h2>
      {/* Tableau pour afficher la liste des formulaires */}
      <table>
        {/* En-tête du tableau */}
        <thead>
          <tr>
            <th>Form Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Corps du tableau avec les données des formulaires */}
        <tbody>
          {forms.map((form) => (
            <tr key={form._id}>
              {/* Cellule contenant le nom du formulaire */}
              <td>{form.formName}</td>
              {/* Cellule contenant les boutons "Edit" et "Delete" */}
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exportation du composant MyForms
export default MyForms;
