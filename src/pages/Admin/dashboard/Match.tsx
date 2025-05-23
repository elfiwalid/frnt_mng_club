import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../../../components/layouts/DashboardLayout.tsx";
import { CheckIcon, PencilIcon } from "@heroicons/react/outline";


const Match: React.FC = () => {
  const [joueurs, setJoueurs] = useState<any[]>([]);
  const [administrateurs, setAdministrateurs] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    dateMatch: "",
    heureMatch: "",
    lieu: "",
    joueur1: 0,
    joueur2: 0,
    administrateur: 0,
  });
  const [editingMatch, setEditingMatch] = useState<any>(null);
  const [resultatJoueur1, setResultatJoueur1] = useState("");
  const [resultatJoueur2, setResultatJoueur2] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/joueurs"),
      axios.get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/administrateurs"),
      axios.get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/matches"),
    ])
      .then(([joueursRes, administrateursRes, matchesRes]) => {
        setJoueurs(joueursRes.data);
        setAdministrateurs(administrateursRes.data);
        setMatches(matchesRes.data);
      })
      .catch(() => toast.error("Erreur lors du chargement des données."));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      dateMatch: formData.dateMatch,
      heureMatch: formData.heureMatch,
      lieu: formData.lieu,
      joueur1: { idJoueur: formData.joueur1 },
      joueur2: { idJoueur: formData.joueur2 },
      administrateur: { idAdministrateur: formData.administrateur },
    };

    axios
      .post("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/matches", payload)
      .then(() => {
        toast.success("Match ajouté avec succès !");
        setFormData({
          dateMatch: "",
          heureMatch: "",
          lieu: "",
          joueur1: 0,
          joueur2: 0,
          administrateur: 0,
        });
        axios.get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/matches").then((res) => {
          setMatches(res.data);
        });
        setFormVisible(false);
      })
      .catch(() => toast.error("Erreur lors de l'ajout du match."));
  };

  const handleSaveResult = async (matchId: number) => {
    if (!resultatJoueur1 || !resultatJoueur2) {
      toast.error("Veuillez entrer les résultats des deux joueurs.");
      return;
    }

    try {
      await axios.put(`http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/matches/${matchId}`, {
        resultatJoueur1,
        resultatJoueur2,
      });

      toast.success("Résultats sauvegardés !");
      setMatches((prevMatches) =>
        prevMatches.map((match) =>
          match.idMatch === matchId
            ? { ...match, resultatJoueur1, resultatJoueur2 }
            : match
        )
      );
      setEditingMatch(null);
      setResultatJoueur1("");
      setResultatJoueur2("");
    } catch (err) {
      console.error("Erreur lors de la mise à jour des résultats :", err);
      toast.error("Impossible de sauvegarder les résultats.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white min-h-screen relative">
        <ToastContainer />

        {/* Add Match Button */}
        {!formVisible && (
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold mb-6 text-green-500">Gestion Matches</h1>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md"
              onClick={() => setFormVisible(true)}
            >
              Ajouter un Match
            </button>
          </div>
        )}

        {/* Match Form */}
        {formVisible && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Créer un Match</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <input
                  type="date"
                  name="dateMatch"
                  value={formData.dateMatch}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  required
                />
                <input
                  type="time"
                  name="heureMatch"
                  value={formData.heureMatch}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  required
                />
                <input
                  type="text"
                  name="lieu"
                  value={formData.lieu}
                  onChange={handleFormChange}
                  placeholder="Lieu"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  required
                />
                <select
                  name="joueur1"
                  value={formData.joueur1}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  required
                >
                  <option value="">Sélectionner Joueur 1</option>
                  {joueurs.map((joueur) => (
                    <option key={joueur.idJoueur} value={joueur.idJoueur}>
                      {joueur.nom}
                    </option>
                  ))}
                </select>
                <select
                  name="joueur2"
                  value={formData.joueur2}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  required
                >
                  <option value="">Sélectionner Joueur 2</option>
                  {joueurs.map((joueur) => (
                    <option key={joueur.idJoueur} value={joueur.idJoueur}>
                      {joueur.nom}
                    </option>
                  ))}
                </select>
                <select
                  name="administrateur"
                  value={formData.administrateur}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  required
                >
                  <option value="">Sélectionner Administrateur</option>
                  {administrateurs.map((admin) => (
                    <option key={admin.idAdministrateur} value={admin.idAdministrateur}>
                      {admin.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Match Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Heure
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Lieu
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Joueur 1
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Joueur 2
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Résultat
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map((match) => (
                <tr key={match.idMatch} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{match.dateMatch}</td>
                  <td className="px-6 py-4">{match.heureMatch}</td>
                  <td className="px-6 py-4">{match.lieu}</td>
                  <td className="px-6 py-4">{match.joueur1?.nom || "N/A"}</td>
                  <td className="px-6 py-4">{match.joueur2?.nom || "N/A"}</td>
                  <td className="px-6 py-4">
                    {match.resultatJoueur1 && match.resultatJoueur2
                      ? `${match.resultatJoueur1} - ${match.resultatJoueur2}`
                      : "Non défini"}
                  </td>
                  <td className="px-6 py-4">
                    {editingMatch === match.idMatch ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Joueur 1"
                          value={resultatJoueur1}
                          onChange={(e) => setResultatJoueur1(e.target.value)}
                          className="w-20 border rounded px-2 py-1"
                        />
                        <input
                          type="text"
                          placeholder="Joueur 2"
                          value={resultatJoueur2}
                          onChange={(e) => setResultatJoueur2(e.target.value)}
                          className="w-20 border rounded px-2 py-1"
                        />
                        <button
                          onClick={() => handleSaveResult(match.idMatch)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setEditingMatch(null)}
                          className="text-red-600 hover:text-red-800"
                        >
                          
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingMatch(match.idMatch)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Match;
