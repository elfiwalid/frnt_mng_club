import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayoutEntraineur from "../../components/layouts/DashboardLayoutEntraineur.tsx"; // Adaptez le chemin selon votre projet
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FiUser, FiShoppingCart, FiTrendingUp, FiDollarSign } from "react-icons/fi";

const StatCard = ({ title, value, icon, change, changeType }: any) => {
  const changeColor = changeType === "positive" ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md w-full transform transition duration-300 hover:scale-105">
      <div>
        <h3 className="text-gray-600 text-sm font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
        <p className={`text-sm ${changeColor}`}>{change}</p>
      </div>
      <div className="text-gray-700">{icon}</div>
    </div>
  );
};

const MatchStatsChart = () => {
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/stats/match-monthly-stats");
        setMonthlyStats(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques mensuelles :", error);
      }
    };

    fetchMonthlyStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Matchs Gagnés et Perdus</h2>
      <BarChart
        width={600}
        height={300}
        data={monthlyStats}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="won" fill="#4caf50" name="Matchs Gagnés" />
        <Bar dataKey="lost" fill="#f44336" name="Matchs Perdus" />
      </BarChart>
    </div>
  );
};

const Home = () => {
  const [stats, setStats] = useState({
    totalJoueurs: 0,
    totalEntraineurs: 0,
    totalMatches: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [joueursRes, entraineursRes, matchesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/stats/total-joueurs"),
          axios.get("http://localhost:8080/api/stats/total-entraineurs"),
          axios.get("http://localhost:8080/api/stats/total-matches"),
        ]);

        setStats({
          totalJoueurs: joueursRes.data,
          totalEntraineurs: entraineursRes.data,
          totalMatches: matchesRes.data,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      }
    };

    fetchStats();
  }, []);

  const activities = [
    { title: "New match created", time: "2 minutes ago", type: "success" },
    { title: "Player registered", time: "1 hour ago", type: "success" },
    { title: "Match canceled", time: "3 hours ago", type: "error" },
    { title: "Training session completed", time: "5 hours ago", type: "success" },
  ];

  return (
    <DashboardLayoutEntraineur>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

        {/* Statistiques dynamiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Joueurs"
            value={stats.totalJoueurs}
            icon={<FiUser size={28} />}
            change="+12%"
            changeType="positive"
          />
          <StatCard
            title="Total Entraineurs"
            value={stats.totalEntraineurs}
            icon={<FiTrendingUp size={28} />}
            change="+8%"
            changeType="positive"
          />
          <StatCard
            title="Total Matches"
            value={stats.totalMatches}
            icon={<FiShoppingCart size={28} />}
            change="-3%"
            changeType="negative"
          />
        </div>

        {/* Graphiques et Activités */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MatchStatsChart />
          </div>

          {/* Activité récente */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Activité Récente</h2>
            <ul>
              {activities.map((activity, index) => (
                <li key={index} className="flex items-center mb-4">
                  <span
                    className={`mr-3 text-lg ${
                      activity.type === "success"
                        ? "text-green-500"
                        : activity.type === "error"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    ●
                  </span>
                  <div>
                    <p className="font-semibold">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayoutEntraineur>
  );
};

export default Home;