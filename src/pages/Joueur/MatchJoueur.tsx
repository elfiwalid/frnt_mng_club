import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayoutJoueur from "../../components/layouts/DashboardLayoutJoueur.tsx"; // Adaptez le chemin selon votre projet

const JoueurMatches: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      const user = localStorage.getItem("user");
      if (!user) {
        setError("Aucun joueur connecté.");
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(user);
      const joueurId = parsedUser.joueurId;

      if (!joueurId) {
        setError("Aucun joueur trouvé pour cet utilisateur.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/matches/joueur/${joueurId}`
        );
        setMatches(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des matchs :", err);
        setError("Impossible de charger vos matchs.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <DashboardLayoutJoueur>
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes Matchs</h1>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Chargement des matchs...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">{error}</p>
        ) : matches.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Aucun match assigné.</p>
        ) : (
          <div className="bg-gray-100 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Heure</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Lieu</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Adversaire</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matches.map((match) => (
                  <tr key={match.idMatch} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{match.dateMatch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{match.heureMatch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{match.lieu}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {match.joueur1?.nom} vs {match.joueur2?.nom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayoutJoueur>
  );
};

export default JoueurMatches;
