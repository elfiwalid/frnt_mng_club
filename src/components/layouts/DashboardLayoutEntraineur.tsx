import React from "react";
import { Link } from "react-router-dom";
import {
  ChartBarIcon,
  UserIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayoutEntraineur: React.FC<DashboardLayoutProps> = ({ children }) => {
  const menuItems = [
    { name: "Dashboard", icon: <ChartBarIcon className="w-6 h-6" />, path: "/entraineur" },
    { name: "Matches", icon: <TrendingUpIcon className="w-6 h-6" />, path: "/Entraineur/match" },
    { name: "Entrainements", icon: <ShoppingBagIcon className="w-6 h-6" />, path: "/Entraineur/Entrainement" },
    { name: "Classements", icon: <ShoppingBagIcon className="w-6 h-6" />, path: "/Entraineur/Classement" },
    { name: "Settings", icon: <CogIcon className="w-6 h-6" />, path: "/admin/settings" },
    { name: "Help", icon: <QuestionMarkCircleIcon className="w-6 h-6" />, path: "/admin/help" },
  ];

  return (
    <div className="min-h-screen flex bg-white text-black">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg overflow-y-auto">
        <div className="p-6 font-bold text-lg">Dashboard</div>
        <nav className="mt-6">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="hover:bg-gray-200 transition duration-300">
                <Link
                  to={item.path}
                  className="flex items-center p-4 text-black w-full hover:text-gray-700"
                >
                  {item.icon}
                  <span className="ml-4">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
       <main className="flex-1 ml-64 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Entraineur</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              🔔
            </button>
            <img
              src="/assets/walid.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
        </header>

        {/* Content */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayoutEntraineur;
