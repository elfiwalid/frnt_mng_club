import React from "react";

const EntraineurDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* En-tête */}
      <header className="bg-green-600 text-white py-4 px-6 rounded-md shadow mb-6">
        <h1 className="text-2xl font-bold">Bienvenue sur votre Dashboard, Entraîneur !</h1>
        <p className="text-sm">
          Gérez les entraînements, les performances de vos joueurs et les prochains matchs.
        </p>
      </header>

      {/* Contenu Principal */}
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Carte : Planning des entraînements */}
          <div className="bg-white shadow rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">Planning des Entraînements</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>21/12/2024 - Condition physique</li>
              <li>23/12/2024 - Tactiques de match</li>
            </ul>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Gérer le planning
            </button>
          </div>

          {/* Carte : Joueurs sous votre responsabilité */}
          <div className="bg-white shadow rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">Joueurs Sous Votre Entraînement</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>John Doe - Attaquant</li>
              <li>Jane Smith - Défenseur</li>
            </ul>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Voir tous les joueurs
            </button>
          </div>

          {/* Carte : Matchs à venir */}
          <div className="bg-white shadow rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">Prochains Matchs</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Match contre Team A - 25/12/2024</li>
              <li>Match contre Team B - 30/12/2024</li>
            </ul>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Préparer la stratégie
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>© 2024 Club Sportif. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default EntraineurDashboard;
