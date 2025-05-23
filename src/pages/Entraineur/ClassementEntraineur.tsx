import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayoutEntraineur from "../../components/layouts/DashboardLayoutEntraineur.tsx"; // Adaptez le chemin selon votre projet

interface Classement {
  idClassement: number;
  point: number;
  joueur: {
    idJoueur: number;
    nom: string;
  };
  statistique: {
    nbrMatchsJoues: number;
    nbrMatchsGagnes: number;
    nbrMatchsPerdus: number;
  };
}

const Classement: React.FC = () => {
  const [classement, setClassement] = useState<Classement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchClassement = async () => {
      try {
        const response = await axios.get("http://backend-walid-h0fshyhfa4fhbrfj.canadacentral-01.azurewebsites.net/api/classement");
        setClassement(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération du classement.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchClassement();
  }, []);

  const renderPositionIcon = (position: number) => {
    if (position === 1) return "🥇";
    if (position === 2) return "🥈";
    if (position === 3) return "🥉";
    return position;
  };

  return (
    <DashboardLayoutEntraineur>
      <div className="p-6 min-h-screen">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">Classement des Joueurs</h1>

        {loading && (
          <div className="text-center text-lg text-blue-600 font-semibold">Chargement du classement...</div>
        )}
        {error && (
          <div className="text-center text-lg text-red-500 font-semibold">{error}</div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Position</th>
                  <th className="px-4 py-3 text-left">Joueur</th>
                  <th className="px-4 py-3 text-center">Points</th>
                  <th className="px-4 py-3 text-center">Matchs Joués</th>
                  <th className="px-4 py-3 text-center">Matchs Gagnés</th>
                  <th className="px-4 py-3 text-center">Matchs Perdus</th>
                </tr>
              </thead>
              <tbody>
                {classement.map((entry, index) => (
                  <tr
                    key={entry.idClassement}
                    className={
                      index % 2 === 0
                        ? "hover:bg-gray-100 transition"
                        : "hover:bg-gray-200 transition"
                    }
                  >
                    <td className="px-4 py-3 text-center font-medium text-xl">
                      {renderPositionIcon(index + 1)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-700 text-lg">{entry.joueur.nom}</td>
                    <td className="px-4 py-3 text-center font-bold text-black">{entry.point}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{entry.statistique.nbrMatchsJoues}</td>
                    <td className="px-4 py-3 text-center text-green-600 font-medium">{entry.statistique.nbrMatchsGagnes}</td>
                    <td className="px-4 py-3 text-center text-red-600 font-medium">{entry.statistique.nbrMatchsPerdus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayoutEntraineur>
  );
};

export default Classement;
