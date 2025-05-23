

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../../../components/layouts/DashboardLayout.tsx"; // Adaptez le chemin selon votre projet

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("joueurs");

  // Form data for each user type
  const [joueurFormData, setJoueurFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    email: "",
    password: "",
    idCategory: "Junior",
  });

  const [entraineurFormData, setEntraineurFormData] = useState({
    nom: "",
    email: "",
    password: "",
  });

  const [administrateurFormData, setAdministrateurFormData] = useState({
    nom: "",
    email: "",
    password: "",
  });

  // User lists
  const [joueurs, setJoueurs] = useState<any[]>([]);
  const [entraineurs, setEntraineurs] = useState<any[]>([]);
  const [administrateurs, setAdministrateurs] = useState<any[]>([]);

  // Fetch data from APIs
  const fetchData = async () => {
    try {
      const [joueursRes, entraineursRes, administrateursRes] = await Promise.all([
        axios.get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/joueurs"),
        axios.get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/entraineurs"),
        axios.get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/administrateurs"),
      ]);

      setJoueurs(joueursRes.data);
      setEntraineurs(entraineursRes.data);
      setAdministrateurs(administrateursRes.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des utilisateurs.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (activeTab === "joueurs") {
      setJoueurFormData({ ...joueurFormData, [name]: value });
    } else if (activeTab === "entraineurs") {
      setEntraineurFormData({ ...entraineurFormData, [name]: value });
    } else if (activeTab === "administrateurs") {
      setAdministrateurFormData({ ...administrateurFormData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let url = "";
      let data = {};

      if (activeTab === "joueurs") {
        url = "http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/joueurs";
        data = joueurFormData;
      } else if (activeTab === "entraineurs") {
        url = "http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/entraineurs";
        data = entraineurFormData;
      } else if (activeTab === "administrateurs") {
        url = "http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/administrateurs";
        data = administrateurFormData;
      }

      await axios.post(url, data);

      toast.success(`${activeTab.slice(0, -1)} ajouté avec succès !`);
      fetchData();

      if (activeTab === "joueurs") {
        setJoueurFormData({
          nom: "",
          prenom: "",
          dateNaissance: "",
          email: "",
          password: "",
          idCategory: "Junior",
        });
      } else if (activeTab === "entraineurs") {
        setEntraineurFormData({
          nom: "",
          email: "",
          password: "",
        });
      } else if (activeTab === "administrateurs") {
        setAdministrateurFormData({
          nom: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-6 text-green-500">Gestion des utilisateurs</h1>

        {/* Tabs */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-6">
          <div className="flex space-x-6">
            {["joueurs", "entraineurs", "administrateurs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
          {activeTab === "joueurs" && (
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="nom"
                value={joueurFormData.nom}
                onChange={handleInputChange}
                placeholder="Nom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="prenom"
                value={joueurFormData.prenom}
                onChange={handleInputChange}
                placeholder="Prénom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                name="dateNaissance"
                value={joueurFormData.dateNaissance}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="idCategory"
                value={joueurFormData.idCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          )}

          {activeTab === "entraineurs" && (
            <>
              <input
                type="text"
                name="nom"
                value={entraineurFormData.nom}
                onChange={handleInputChange}
                placeholder="Nom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </>
          )}

          {activeTab === "administrateurs" && (
            <>
              <input
                type="text"
                name="nom"
                value={administrateurFormData.nom}
                onChange={handleInputChange}
                placeholder="Nom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            value={
              activeTab === "joueurs"
                ? joueurFormData.email
                : activeTab === "entraineurs"
                ? entraineurFormData.email
                : administrateurFormData.email
            }
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={
              activeTab === "joueurs"
                ? joueurFormData.password
                : activeTab === "entraineurs"
                ? entraineurFormData.password
                : administrateurFormData.password
            }
            onChange={handleInputChange}
            placeholder="Mot de passe"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>

        {/* Table */}
<div className="bg-white rounded-lg shadow-md overflow-x-auto">
  <table className="min-w-full table-auto divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Nom
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Email
        </th>
        {activeTab === "joueurs" && (
          <>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Date de Naissance
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Catégorie
            </th>
          </>
        )}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {(activeTab === "joueurs"
        ? joueurs
        : activeTab === "entraineurs"
        ? entraineurs
        : administrateurs
      ).map((user, index) => (
        <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {user.nom}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {user.email}
          </td>
          {activeTab === "joueurs" && (
            <>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.dateNaissance}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.idCategory}
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;

