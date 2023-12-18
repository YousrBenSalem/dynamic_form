// Importation des hooks depuis React
import { useState } from "react";

// Importation du client HTTP axios
import axios from "axios";

// Importation des composants depuis react-router-dom
import { Link, useNavigate } from "react-router-dom";

// Importation des styles CSS spécifiques
import styles from "./styles.module.css";

// Composant fonctionnel Signup
const Signup = () => {
  // État local pour stocker les données du formulaire
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // État local pour gérer les erreurs
  const [error, setError] = useState("");

  // Utilisation du hook de navigation de react-router-dom
  const navigate = useNavigate();

  // Fonction de gestion des changements de saisie dans les champs du formulaire
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // URL de l'API pour la création d'un utilisateur
      const url = "http://localhost:8080/api/users";

      // Envoi de la requête POST avec les données du formulaire
      const { data: res } = await axios.post(url, data);

      // Redirection vers la page de connexion après inscription réussie
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      // Gestion des erreurs de la requête
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Retour du JSX représentant la structure du composant
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          {/* Formulaire d'inscription */}
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Exportation du composant Signup
export default Signup;
