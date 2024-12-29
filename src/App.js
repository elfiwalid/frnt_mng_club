import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Walid from './pages/Home.tsx';
import Home from './pages/Admin/dashboard/dashboard.tsx'
import Users from './pages/Admin/dashboard/Users.tsx'
import Ajoute from './pages/Admin/dashboard/CrudUser.tsx'
import JoueurDashboard from './pages/Joueur/JoueurDashboard.tsx';
import EntraineurDashboard from './pages/Entraineur/EntraineurDashboard.tsx';
import Entrainement from './pages/Admin/dashboard/EntrainementManagement.tsx';
import Match from './pages/Admin/dashboard/Match.tsx';
import EntrainementJoueur from './pages/Joueur/EntrainementJoueur.tsx'
import MatchJoueur from './pages/Joueur/MatchJoueur.tsx'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Appel à l'API backend Spring Boot avec Axios
    axios.get('http://localhost:8080/api/hello')
      .then(response => {
        setMessage(response.data);  // Met à jour l'état avec la réponse
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  return (
    <Router>
      <div>
        {/* Le message peut être affiché ici, hors des Routes */}
        <h1>www : {message}</h1>

        {/* Configuration des routes */}
        <Routes>
          <Route path="/" element={<Walid />} />
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/user" element={<Users />} />
          <Route path="/admin/user/ajoute" element={<Ajoute />} />
          <Route path='/admin/entrainement' element={<Entrainement />} />
          <Route path='/Joueur' element={ <JoueurDashboard />} />
          <Route path='/Entraineur' element={ <EntraineurDashboard />} />
          <Route path='/Entrainement' element={ <Entrainement />} />
          <Route path='/Match' element={ <Match />} />
          <Route path='/Joueur/EntrainementJoueur' element={ <EntrainementJoueur />} />
          <Route path='/Joueur/MatchJoueur' element={ <MatchJoueur />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
