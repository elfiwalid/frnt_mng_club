import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayoutJoueur from "../../components/layouts/DashboardLayoutJoueur.tsx"; // Adaptez le chemin selon votre projet


const JoueurDashboard = () => {
  const [joueurInfo, setJoueurInfo] = useState<{ nom: string; joueurId: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      console.log("Données utilisateur dans localStorage :", JSON.parse(user));
      const parsedUser = JSON.parse(user);
      setJoueurInfo({ nom: parsedUser.nom, joueurId: parsedUser.joueurId });
    }
  }, []);
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Rediriger vers la page de connexion
  };

  return (
    <DashboardLayoutJoueur>
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md p-6 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              Dashboard Joueur
              {joueurInfo && (
                <span className="text-gray-600 ml-2">
                  - {joueurInfo.nom} (ID: {joueurInfo.joueurId})
                </span>
              )}
            </h1>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </header>

        {/* Stats Section */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-600">Classement</h2>
            <p className="text-4xl font-bold text-blue-500">5ème</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-600">Matchs Joués</h2>
            <p className="text-4xl font-bold text-green-500">12</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-600">Entraînements</h2>
            <p className="text-4xl font-bold text-yellow-500">20</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-600">Points</h2>
            <p className="text-4xl font-bold text-red-500">150</p>
          </div>
        </section>

        {/* Recent Activities Section */}
        <section className="p-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Activités Récentes</h2>
            <table className="table-auto w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2">Date</th>
                  <th className="border-b px-4 py-2">Activité</th>
                  <th className="border-b px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b px-4 py-2">2024-12-20</td>
                  <td className="border-b px-4 py-2">Match contre Équipe B</td>
                  <td className="border-b px-4 py-2 text-green-600">Terminé</td>
                </tr>
                <tr>
                  <td className="border-b px-4 py-2">2024-12-22</td>
                  <td className="border-b px-4 py-2">Entraînement Élite</td>
                  <td className="border-b px-4 py-2 text-blue-600">À venir</td>
                </tr>
                <tr>
                  <td className="border-b px-4 py-2">2024-12-25</td>
                  <td className="border-b px-4 py-2">Match Amical</td>
                  <td className="border-b px-4 py-2 text-yellow-600">En attente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
    </DashboardLayoutJoueur>
  );
};

export default JoueurDashboard;
