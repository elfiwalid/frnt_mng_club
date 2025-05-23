import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Walid = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://walid-club-bdh2gdg5hcdzcvam.canadacentral-01.azurewebsites.net/api/auth/login", loginData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Connexion réussie !");
      console.log("Login success:", response.data);

      // Redirection ou logique supplémentaire selon le rôle
      const userRole = response.data.role;
      if (userRole === "JOUEUR") {
        window.location.href = "/joueur"; // Page du joueur
      } else if (userRole === "ENTRAINEUR") {
        window.location.href = "/entraineur/"; // Page de l'entraîneur
      } else if (userRole === "ADMINISTRATEUR") {
        window.location.href = "/admin"; // Page de l'administrateur
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Erreur lors de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tableau de Bord</h1>

      <p className="text-gray-700">
        Bienvenue dans la plateforme de gestion du club sportif.
      </p>

      {/* Bouton pour afficher le formulaire de connexion */}
      <div className="mt-6">
        <button
          onClick={() => setShowLoginForm(!showLoginForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
        >
          Login
        </button>
      </div>

      {/* Formulaire de connexion */}
      {showLoginForm && (
        <div className="bg-white p-6 shadow rounded-md mt-6">
          <h2 className="text-xl font-bold mb-4">Connexion</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Votre email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Connexion
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Walid;
