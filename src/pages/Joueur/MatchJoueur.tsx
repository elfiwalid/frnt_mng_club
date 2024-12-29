import React, { useEffect, useState } from "react";
import axios from "axios";

const JoueurMatches: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Récupérez l'ID du joueur connecté (par exemple, depuis le stockage local ou l'authentification)
    const joueurId = localStorage.getItem("joueurId") || 1; // Par défaut, ID 1 pour test

    axios
      .get(`http://localhost:8080/api/matches/joueur/${joueurId}`)
      .then((response) => {
        setMatches(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setError("Impossible de charger les matchs.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des matchs...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (matches.length === 0) {
    return <p>Aucun match assigné.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Mes Matchs</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Heure</th>
            <th className="border px-4 py-2">Lieu</th>
            <th className="border px-4 py-2">Adversaire</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.idMatch}>
              <td className="border px-4 py-2">{match.dateMatch}</td>
              <td className="border px-4 py-2">{match.heureMatch}</td>
              <td className="border px-4 py-2">{match.lieu}</td>
              <td className="border px-4 py-2">
                {match.joueur1.nom} vs {match.joueur2.nom}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoueurMatches;
