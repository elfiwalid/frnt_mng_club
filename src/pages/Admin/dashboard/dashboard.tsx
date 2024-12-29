import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barre latérale */}
      <aside className="w-64 bg-blue-600 text-white">
        <div className="p-4 text-2xl font-bold text-center">Club Sportif</div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer"
              onClick={() => handleNavigation("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer"
              onClick={() => handleNavigation("/admin/user")}
            >
              Utilisateurs
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer"
              onClick={() => handleNavigation("/Entrainement")}
            >
              Entraînements
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer"
              onClick={() => handleNavigation("/Match")}
            >
              Matchs
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer"
              onClick={() => handleNavigation("/statistiques")}
            >
              Statistiques
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1">
        {/* En-tête */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Se déconnecter
            </button>
          </div>
        </header>

        {/* Cartes statistiques */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600">Joueurs</h2>
            <p className="text-3xl font-bold text-blue-600">120</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600">Entraînements</h2>
            <p className="text-3xl font-bold text-green-600">45</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600">Matchs</h2>
            <p className="text-3xl font-bold text-red-600">15</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600">Messages</h2>
            <p className="text-3xl font-bold text-yellow-600">8</p>
          </div>
        </section>

        {/* Tableau ou graphique */}
        <section className="p-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Activités récentes
            </h2>
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2">Date</th>
                  <th className="border-b px-4 py-2">Activité</th>
                  <th className="border-b px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b px-4 py-2">2024-11-28</td>
                  <td className="border-b px-4 py-2">Match contre Équipe B</td>
                  <td className="border-b px-4 py-2 text-green-600">Terminé</td>
                </tr>
                <tr>
                  <td className="border-b px-4 py-2">2024-11-30</td>
                  <td className="border-b px-4 py-2">Entraînement Junior</td>
                  <td className="border-b px-4 py-2 text-blue-600">Prévu</td>
                </tr>
                <tr>
                  <td className="border-b px-4 py-2">2024-12-01</td>
                  <td className="border-b px-4 py-2">Match amical</td>
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

export default Home;
