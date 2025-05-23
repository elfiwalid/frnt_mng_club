import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface JoueurForm {
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  password: string;
  idCategory: number;
}

interface EntraineurForm {
  nom: string;
  email: string;
  password: string;
}

interface AdministrateurForm {
  nom: string;
  email: string;
  password: string;
}

const Users: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [joueurs, setJoueurs] = useState<any[]>([]);
  const [entraineurs, setEntraineurs] = useState<any[]>([]);
  const [administrateurs, setAdministrateurs] = useState<any[]>([]);

  const [joueurFormData, setJoueurFormData] = useState<JoueurForm>({
    nom: "",
    prenom: "",
    dateNaissance: "",
    email: "",
    password: "",
    idCategory: 1,
  });
  const [entraineurFormData, setEntraineurFormData] = useState<EntraineurForm>({
    nom: "",
    email: "",
    password: "",
  });
  const [administrateurFormData, setAdministrateurFormData] = useState<AdministrateurForm>({
    nom: "",
    email: "",
    password: "",
  });

  // Charger les utilisateurs
  useEffect(() => {
    axios
      .get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/joueurs")
      .then((res) => setJoueurs(res.data))
      .catch(() => toast.error("Erreur lors d'affichage des joueurs."));

    axios
      .get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/entraineurs")
      .then((res) => setEntraineurs(res.data))
      .catch(() => toast.error("Erreur lors d'affichage des entraîneurs."));

    axios
      .get("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/administrateurs")
      .then((res) => setAdministrateurs(res.data))
      .catch(() => toast.error("Erreur lors d'affichage desadministrateurs."));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (activeForm === "joueur") {
      setJoueurFormData({
        ...joueurFormData,
        [name]: name === "idCategory" ? parseInt(value, 10) : value,
      });
    } else if (activeForm === "entraineur") {
      setEntraineurFormData({ ...entraineurFormData, [name]: value });
    } else if (activeForm === "administrateur") {
      setAdministrateurFormData({ ...administrateurFormData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (activeForm === "joueur") {
        const payload = {
          ...joueurFormData,
          category: { idCategory: joueurFormData.idCategory },
        };
        await axios.post("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/joueurs", payload);
        toast.success(`Joueur ${joueurFormData.nom} enregistré avec succès !`);
        setJoueurFormData({
          nom: "",
          prenom: "",
          dateNaissance: "",
          email: "",
          password: "",
          idCategory: 1,
        });
      } else if (activeForm === "entraineur") {
        await axios.post("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/entraineurs", entraineurFormData);
        toast.success(`Entraîneur ${entraineurFormData.nom} enregistré avec succès !`);
        setEntraineurFormData({ nom: "", email: "", password: "" });
      } else if (activeForm === "administrateur") {
        await axios.post("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/users/administrateurs", administrateurFormData);
        toast.success(`Administrateur ${administrateurFormData.nom} enregistré avec succès !`);
        setAdministrateurFormData({ nom: "", email: "", password: "" });
      }

      setActiveForm(null);
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement :", error.response?.data || error.message);
      toast.error(error.response?.data || "Une erreur est survenue lors de l'enregistrement.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>

      <div className="flex space-x-4 mb-6">
        <ToastContainer />
        <button
          onClick={() => setActiveForm("joueur")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Ajouter Joueur
        </button>
        <button
          onClick={() => setActiveForm("entraineur")}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Ajouter Entraîneur
        </button>
        <button
          onClick={() => setActiveForm("administrateur")}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Ajouter Administrateur
        </button>
      </div>

            {/* Liste des utilisateurs */}
            <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Joueurs :</h2>
        <ul className="list-disc pl-5">
          {joueurs.map((joueur) => (
            <li key={joueur.idJoueur}>
              {joueur.nom} ({joueur.email})
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Entraîneurs :</h2>
        <ul className="list-disc pl-5">
          {entraineurs.map((entraineur) => (
            <li key={entraineur.idEntraineur}>
              {entraineur.nom} ({entraineur.email})
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Administrateurs :</h2>
        <ul className="list-disc pl-5">
          {administrateurs.map((administrateur) => (
            <li key={administrateur.idAdministrateur}>
              {administrateur.nom} ({administrateur.email})
            </li>
          ))}
        </ul>
      </div>

      {activeForm && (
        <div className="bg-white p-6 shadow rounded-md">
          <form onSubmit={handleSubmit}>
            {activeForm === "joueur" && (
              <>
                <h2 className="text-xl font-bold mb-4">Ajouter Joueur</h2>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={joueurFormData.nom}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  value={joueurFormData.prenom}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="date"
                  name="dateNaissance"
                  value={joueurFormData.dateNaissance}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={joueurFormData.email}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={joueurFormData.password}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <select
                  name="idCategory"
                  value={joueurFormData.idCategory}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                >
                  <option value={1}>Jenior</option>
                  <option value={2}>Catégorie 2</option>
                </select>
              </>
            )}

            {activeForm === "entraineur" && (
              <>
                <h2 className="text-xl font-bold mb-4">Ajouter Entraîneur</h2>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={entraineurFormData.nom}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={entraineurFormData.email}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={entraineurFormData.password}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
              </>
            )}

            {activeForm === "administrateur" && (
              <>
                <h2 className="text-xl font-bold mb-4">Ajouter Administrateur</h2>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={administrateurFormData.nom}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={administrateurFormData.email}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={administrateurFormData.password}
                  onChange={handleFormChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  required
                />
              </>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Enregistrer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
