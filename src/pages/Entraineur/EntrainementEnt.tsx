import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayoutEntraineur from "../../components/layouts/DashboardLayoutEntraineur.tsx"; // Adaptez le chemin selon votre projet

const Entrainement: React.FC = () => {
  const [joueurs, setJoueurs] = useState<any[]>([]);
  const [entraineurs, setEntraineurs] = useState<any[]>([]);
  const [administrateurs, setAdministrateurs] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    dateEntrainement: "",
    description: "",
    joueur: 0,
    entraineur: 0,
    administrateur: 0,
  });

  useEffect(() => {
    axios
      .get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/joueurs")
      .then((res) => setJoueurs(res.data))
      .catch(() => toast.error("Erreur lors du chargement des joueurs"));

    axios
      .get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/entraineurs")
      .then((res) => setEntraineurs(res.data))
      .catch(() => toast.error("Erreur lors du chargement des entraîneurs"));

    axios
      .get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/administrateurs")
      .then((res) => setAdministrateurs(res.data))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      joueur: { idJoueur: formData.joueur },
      entraineur: { idEntraineur: formData.entraineur },
      administrateur: { idAdministrateur: formData.administrateur },
    };

    axios
      .post("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/entrainements", payload)
      .then(() => {
        toast.success("Entraînement ajouté avec succès !");
        setFormData({
          dateEntrainement: "",
          description: "",
          joueur: 0,
          entraineur: 0,
          administrateur: 0,
        });
      })
      .catch(() => toast.error("Erreur lors de l'ajout de l'entraînement"));
  };

  return (
    <DashboardLayoutEntraineur>
      <div className="p-6">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-green-500 mb-6">Gestion des Entraînements</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
          <div className="mb-6">
            <label htmlFor="dateEntrainement" className="block text-sm font-medium text-gray-700">
              Date de l'entraînement
            </label>
            <input
              type="date"
              id="dateEntrainement"
              name="dateEntrainement"
              value={formData.dateEntrainement}
              onChange={handleFormChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleTextareaChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gray-500 focus:border-gray-500"
              placeholder="Description de l'entraînement"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="joueur" className="block text-sm font-medium text-gray-700">
              Sélectionner un joueur
            </label>
            <select
              id="joueur"
              name="joueur"
              value={formData.joueur}
              onChange={handleFormChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gray-500 focus:border-gray-500"
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

          <div className="mb-6">
            <label htmlFor="entraineur" className="block text-sm font-medium text-gray-700">
              Sélectionner un entraîneur
            </label>
            <select
              id="entraineur"
              name="entraineur"
              value={formData.entraineur}
              onChange={handleFormChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gray-500 focus:border-gray-500"
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

          <div className="mb-6">
            <label htmlFor="administrateur" className="block text-sm font-medium text-gray-700">
              Sélectionner un administrateur
            </label>
            <select
              id="administrateur"
              name="administrateur"
              value={formData.administrateur}
              onChange={handleFormChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gray-500 focus:border-gray-500"
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

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Ajouter l'entraînement
          </button>
        </form>
      </div>
    </DashboardLayoutEntraineur>
  );
};

export default Entrainement;
