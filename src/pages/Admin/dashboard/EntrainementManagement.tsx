import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Entrainement: React.FC = () => {
  const [joueurs, setJoueurs] = useState<any[]>([]); // Liste des joueurs
  const [entraineurs, setEntraineurs] = useState<any[]>([]); // Liste des entraîneurs
  const [administrateurs, setAdministrateurs] = useState<any[]>([]); // Liste des administrateurs
  const [formData, setFormData] = useState({
    dateEntrainement: "",
    description: "",
    joueurs: [] as number[], // IDs des joueurs sélectionnés
    entraineur: 0, // ID de l'entraîneur sélectionné
    administrateur: 0, // ID de l'administrateur sélectionné
  });

  const [selectAllJoueurs, setSelectAllJoueurs] = useState(false); // État pour "Tout sélectionner"

  // Charger les données nécessaires pour le formulaire
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/joueurs")
      .then((res) => {
        console.log("Joueurs récupérés :", res.data);
        setJoueurs(res.data);
      })
      .catch(() => toast.error("Erreur lors du chargement des joueurs"));

    axios
      .get("http://localhost:8080/api/users/entraineurs")
      .then((res) => {
        console.log("Entraîneurs récupérés :", res.data); // Débogage
        setEntraineurs(res.data);
      })
      .catch(() => toast.error("Erreur lors du chargement des entraîneurs"));

    axios
      .get("http://localhost:8080/api/users/administrateurs")
      .then((res) => {
        console.log("Administrateurs récupérés :", res.data);
        setAdministrateurs(res.data);
      })
      .catch(() => toast.error("Erreur lors du chargement des administrateurs"));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectAllJoueurs = () => {
    if (selectAllJoueurs) {
      setFormData({ ...formData, joueurs: [] });
    } else {
      setFormData({ ...formData, joueurs: joueurs.map((joueur) => joueur.idJoueur) });
    }
    setSelectAllJoueurs(!selectAllJoueurs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      joueurs: formData.joueurs.map((id) => ({ idJoueur: id })),
      entraineur: { idEntraineur: formData.entraineur },
      administrateur: { idAdministrateur: formData.administrateur },
    };

    axios
      .post("http://localhost:8080/api/entrainements", payload)
      .then(() => {
        toast.success("Entraînement ajouté avec succès !");
        setFormData({
          dateEntrainement: "",
          description: "",
          joueurs: [],
          entraineur: 0,
          administrateur: 0,
        });
        setSelectAllJoueurs(false);
      })
      .catch(() => toast.error("Erreur lors de l'ajout de l'entraînement"));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Ajouter un Entraînement</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="dateEntrainement">
            Date de l'entraînement
          </label>
          <input
            type="date"
            id="dateEntrainement"
            name="dateEntrainement"
            value={formData.dateEntrainement}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextareaChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Description de l'entraînement"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="joueurs">
            Ajouter des joueurs
          </label>
          <button
            type="button"
            onClick={handleSelectAllJoueurs}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
          >
            {selectAllJoueurs ? "Désélectionner tout" : "Tout sélectionner"}
          </button>
          <select
            id="joueurs"
            name="joueurs"
            onChange={handleFormChange}
            className="w-full px-4 py-2 border rounded-md"
            multiple
          >
            {joueurs.map((joueur) => (
              <option key={joueur.idJoueur} value={joueur.idJoueur}>
                {joueur.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="entraineur">
            Sélectionner un entraîneur
          </label>
          <select
            id="entraineur"
            name="entraineur"
            value={formData.entraineur}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="">Sélectionner un entraîneur</option>
            {entraineurs.map((entraineur) => (
              <option key={entraineur.idEntraineur} value={entraineur.idEntraineur}>
                {entraineur.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="administrateur">
            Sélectionner un administrateur
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
            {administrateurs.map((administrateur) => (
              <option key={administrateur.idAdministrateur} value={administrateur.idAdministrateur}>
                {administrateur.nom}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Ajouter l'entraînement
        </button>
      </form>
    </div>
  );
};

export default Entrainement;
