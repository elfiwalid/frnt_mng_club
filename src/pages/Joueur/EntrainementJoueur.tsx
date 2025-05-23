import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayoutJoueur from "../../components/layouts/DashboardLayoutJoueur.tsx"; // Adaptez le chemin selon votre projet


const MesEntrainements: React.FC = () => {
  const [entrainements, setEntrainements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntrainements = async () => {
      const joueurId = getLoggedInJoueurId();

      if (!joueurId) {
        toast.error("Aucun joueur connecté ou rôle non valide.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://backend-walid-h0fshyhfa4fhbrfj.canadacentral-01.azurewebsites.net/api/entrainements/joueur/${joueurId}`);
        setEntrainements(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des entraînements :", error);
        toast.error("Impossible de charger vos entraînements.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntrainements();
  }, []);

  const getLoggedInJoueurId = () => {
    const user = localStorage.getItem("user");
    if (!user) return null;

    const parsedUser = JSON.parse(user);

    // Vérifiez si le rôle est joueur avant de retourner l'idJoueur
    if (parsedUser.role === "JOUEUR") {
      return parsedUser.joueurId;
    }

    return null; // Pas un joueur connecté
  };

  if (loading) return <p>Chargement...</p>;

  if (!entrainements.length) return <p>Aucun entraînement trouvé.</p>;

  return (
    <DashboardLayoutJoueur>
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes Entraînements</h1>
      <ul className="space-y-4">
        {entrainements.map((entrainement: any) => (
          <li key={entrainement.idEntrainement} className="bg-gray-100 p-4 rounded shadow">
            <p className="text-lg font-semibold">{entrainement.dateEntrainement}</p>
            <p className="text-gray-700">{entrainement.description}</p>
          </li>
        ))}
      </ul>
    </div>
    </DashboardLayoutJoueur>
  );
};

export default MesEntrainements;
