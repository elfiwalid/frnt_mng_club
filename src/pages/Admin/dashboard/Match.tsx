import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Match: React.FC = () => {
  const [joueurs, setJoueurs] = useState<any[]>([]); // Liste des joueurs
  const [administrateurs, setAdministrateurs] = useState<any[]>([]); // Liste des administrateurs
  const [matches, setMatches] = useState<any[]>([]); // Liste des matches
  const [formVisible, setFormVisible] = useState(false); // Affichage du formulaire
  const [formData, setFormData] = useState({
    dateMatch: "",
    heureMatch: "",
    lieu: "",
    joueur1: 0, // ID de joueur1
    joueur2: 0, // ID de joueur2
    administrateur: 0, // ID de l'administrateur
  });

  // Charger les données en parallèle
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/api/users/joueurs"),
      axios.get("http://localhost:8080/api/users/administrateurs"),
      axios.get("http://localhost:8080/api/matches"),
    ])
      .then(([joueursRes, administrateursRes, matchesRes]) => {
        setJoueurs(joueursRes.data);
        setAdministrateurs(administrateursRes.data);
        setMatches(matchesRes.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
        toast.error("Erreur lors du chargement des données.");
      });
  }, []);

  // Gérer les changements dans le formulaire
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      dateMatch: formData.dateMatch,
      heureMatch: formData.heureMatch,
      lieu: formData.lieu,
      joueur1: { idJoueur: formData.joueur1 },
      joueur2: { idJoueur: formData.joueur2 },
      administrateur: { idAdministrateur: formData.administrateur },
    };

    axios
      .post("http://localhost:8080/api/matches", payload)
      .then(() => {
        toast.success("Match ajouté avec succès !");
        setFormData({
          dateMatch: "",
          heureMatch: "",
          lieu: "",
          joueur1: 0,
          joueur2: 0,
          administrateur: 0,
        });
        // Recharger la liste des matches
        axios.get("http://localhost:8080/api/matches").then((res) => {
          setMatches(res.data);
        });
        setFormVisible(false);
      })
      .catch(() => toast.error("Erreur lors de l'ajout du match."));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />

      {/* Liste des matches */}
      <h1 className="text-2xl font-bold mb-6">Liste des Matches</h1>
      <ul className="bg-white p-4 shadow-md rounded-md mb-6">
        {matches.length > 0 ? (
          matches.map((match) => (
            <li key={match.idMatch} className="border-b py-2">
              <div>Date : {match.dateMatch}</div>
              <div>Heure : {match.heureMatch}</div>
              <div>Lieu : {match.lieu}</div>
              <div>Joueur 1 : {match.joueur1?.nom || "Non défini"}</div>
              <div>Joueur 2 : {match.joueur2?.nom || "Non défini"}</div>
              <div>
                Administrateur : {match.administrateur ? match.administrateur.nom : "Aucun"}
              </div>
            </li>
          ))
        ) : (
          <p>Aucun match enregistré pour le moment.</p>
        )}
      </ul>

      {/* Bouton pour afficher le formulaire */}
      {!formVisible && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setFormVisible(true)}
        >
          Ajouter un Match
        </button>
      )}

      {/* Formulaire pour ajouter un match */}
      {formVisible && (
        <div className="bg-white p-6 shadow-md rounded-md mt-6">
          <h2 className="text-xl font-bold mb-4">Créer un Match</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="dateMatch">
                Date du Match
              </label>
              <input
                type="date"
                id="dateMatch"
                name="dateMatch"
                value={formData.dateMatch}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="heureMatch">
                Heure du Match
              </label>
              <input
                type="time"
                id="heureMatch"
                name="heureMatch"
                value={formData.heureMatch}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="lieu">
                Lieu
              </label>
              <input
                type="text"
                id="lieu"
                name="lieu"
                value={formData.lieu}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Lieu du match"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="joueur1">
                Joueur 1
              </label>
              <select
                id="joueur1"
                name="joueur1"
                value={formData.joueur1}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Sélectionner un joueur</option>
                {joueurs.map((joueur) => (
                  <option key={joueur.idJoueur} value={joueur.idJoueur}>
                    {joueur.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="joueur2">
                Joueur 2
              </label>
              <select
                id="joueur2"
                name="joueur2"
                value={formData.joueur2}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Sélectionner un joueur</option>
                {joueurs.map((joueur) => (
                  <option key={joueur.idJoueur} value={joueur.idJoueur}>
                    {joueur.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="administrateur">
                Administrateur
              </label>
              <select
                id="administrateur"
                name="administrateur"
                value={formData.administrateur}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Sélectionner un administrateur</option>
                {administrateurs.map((admin) => (
                  <option key={admin.idAdministrateur} value={admin.idAdministrateur}>
                    {admin.nom}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Créer le Match
            </button>
            <button
              type="button"
              className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-md"
              onClick={() => setFormVisible(false)}
            >
              Annuler
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Match;
