import React, { useEffect, useState } from "react";
import axios from "axios";

const JoueurEntrainements: React.FC = () => {
  const [entrainements, setEntrainements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ID du joueur connecté (par exemple, récupéré à partir de l'authentification)
    const joueurId = localStorage.getItem("joueurId") || 1; // Exemple : Récupération du joueur ID

    axios
      .get(`http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/entrainements/joueur/${joueurId}`)
      .then((response) => {
        setEntrainements(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setError("Impossible de charger les entraînements.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des entraînements...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (entrainements.length === 0) {
    return <p>Aucun entraînement assigné.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Mes Entraînements</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {entrainements.map((entrainement) => (
            <tr key={entrainement.idEntrainement}>
              <td className="border px-4 py-2">{entrainement.dateEntrainement}</td>
              <td className="border px-4 py-2">{entrainement.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoueurEntrainements;
