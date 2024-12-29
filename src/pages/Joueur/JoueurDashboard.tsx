import React from "react";
import { useNavigate } from "react-router-dom";

const JoueurDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="p-6 text-center text-2xl font-bold border-b border-blue-400">
          Club Sportif
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li
              className="px-6 py-3 hover:bg-blue-600 cursor-pointer"
              onClick={() => handleNavigation("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className="px-6 py-3 hover:bg-blue-600 cursor-pointer"
              onClick={() => handleNavigation("/joueur/matchjoueur")}
            >
              Matchs
            </li>
            <li
              className="px-6 py-3 hover:bg-blue-600 cursor-pointer"
              onClick={() => handleNavigation("/joueur/entrainementjoueur")}
            >
              Entraînements
            </li>
            <li
              className="px-6 py-3 hover:bg-blue-600 cursor-pointer"
              onClick={() => handleNavigation("/player/rankings")}
            >
              Classement
            </li>
            <li
              className="px-6 py-3 hover:bg-blue-600 cursor-pointer"
              onClick={() => handleNavigation("/player/profile")}
            >
              Profil
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard Joueur</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600">
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
  );
};

export default JoueurDashboard;
