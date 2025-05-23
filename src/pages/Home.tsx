import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AcademicCapIcon,
  UsersIcon,
  CalendarIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";

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
      const response = await axios.post("http://localhost:8080/api/auth/login", loginData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Connexion réussie !");
  
      const userData = response.data;
  
      // Vérifiez les données reçues
      console.log("Données utilisateur après connexion :", userData);
  
      // Stockez l'ID et le nom dans localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id, // ID générique de l'utilisateur
          joueurId: userData.joueurId, // ID spécifique au joueur, s'il est joueur
          nom: userData.nom, // Nom de l'utilisateur connecté
          role: userData.role, // Rôle de l'utilisateur
        })
      );
  
      // Redirection basée sur le rôle
      if (userData.role === "JOUEUR") {
        window.location.href = "/joueur"; // Redirection vers le tableau de bord joueur
      } if (userData.role === "ENTRAINEUR") {
        window.location.href = "/entraineur"; // Redirection vers le tableau de bord joueur
      } if (userData.role === "ADMINISTRATEUR") {
        window.location.href = "/admin"; // Redirection vers le tableau de bord joueur
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Erreur lors de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-white border-b">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-3xl font-bold text-green-600">
            Sports Life
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-green-600">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Facility
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Training
            </a>
          </nav>
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => setShowLoginForm(!showLoginForm)} // Basculer l'état d'affichage
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Connexion
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-green-600">
              ☰
            </button>
          </div>
        </div>
      </header>

      {showLoginForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-8 mt-16 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Connexion
      </h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Se connecter
        </button>
        {/* Close button */}
        <button
          type="button"
          onClick={() => setShowLoginForm(false)}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Annuler
        </button>
      </form>
    </div>
  </div>
)}


      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Play Games & <br />
            <span className="text-green-600">Live Healthy Life</span>
          </h1>
          <p className="text-lg text-gray-600">
            Our staff are always on hand to make all members feel welcome. Fully
            dedicated to golf lovers.
          </p>
          <div className="space-x-4">
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Join Our Club
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg text-gray-600 hover:border-green-600 hover:text-green-600">
              About Us
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src="/assets/p.png"
            alt="Golf Player"
            className="rounded-lg"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Good Facilities",
              icon: <ClipboardListIcon className="w-12 h-12 text-green-600" />,
              desc: "State-of-the-art facilities for golf and fitness enthusiasts.",
            },
            {
              title: "Expert Trainers",
              icon: <UsersIcon className="w-12 h-12 text-green-600" />,
              desc: "Get coached by the best trainers in the field.",
            },
            {
              title: "Customer Trust",
              icon: <AcademicCapIcon className="w-12 h-12 text-green-600" />,
              desc: "We are trusted by thousands of customers worldwide.",
            },
            {
              title: "Monthly Events",
              icon: <CalendarIcon className="w-12 h-12 text-green-600" />,
              desc: "Exciting tournaments and events every month.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative">
          <img
            src="/assets/team1.jpg"
            alt="Children playing"
            className="rounded-lg  w-[600px] h-[400px] "
          />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <h3 className="text-green-600 text-4xl font-bold">About us</h3>
          <h1 className="text-4xl font-bold text-gray-800">
            We Are The Best Playing Club In Your Local Area
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            We offer a lot of courses of varying difficulty and beautiful scenery
            that golfers of all skill levels can enjoy. You will learn golf from
            professionals with our competent and experienced staff. You will have
            great fun with our magnificent illuminated field.
          </p>
          {/* Features List */}
          <div className="space-y-4">
            {[
              {
                icon: "g",
                title: "Professional Team",
                desc: "Modern & latest equipment with expert coaching.",
              },
              {
                icon: "e",
                title: "Professional Trainings",
                desc: "Modern & latest equipment with expert coaching.",
              },
              {
                icon: "f",
                title: "Practice Facilities",
                desc: "Modern & latest equipment with expert coaching.",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-50	 text-green-600 flex items-center justify-center font-bold text-xl rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Read More Button */}
          <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Read More
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="text-green-600 text-4xl font-bold">Club View</h3>
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Play and enjoy our club for free
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            We offer a lot of courses of varying difficulty and beautiful
            scenery that golfers of all skill levels can enjoy. You will learn
            golf from professionals with our competent and experienced staff.
            You will have great fun with our magnificent illuminated field.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4">
            {[
              "300+ Golf Competitions",
              "Amateur Championships",
              "Proficient on Golf",
              "Individual Support",
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-5 h-5 bg-green-600 text-white flex items-center justify-center rounded-full">
                  ✓
                </span>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Join Our Club
          </button>
        </div>

{/* Image Section */}
<div className="relative">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Première Image */}
    <div className="relative group">
      <img
        src="/assets/team2.jpg"
        alt="Children playing"
        className="rounded-lg w-full h-[250px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">Enjoy Playing</span>
      </div>
    </div>
    {/* Deuxième Image */}
    <div className="relative group">
      <img
        src="/assets/team3.jpg"
        alt="Child with ball"
        className="rounded-lg w-full h-[250px] object-cover  "
      />
      <div className="absolute inset-0  bg-black bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">Have Fun!</span>
      </div>
    </div>
  </div>
          {/* Service Badge */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-lg px-6 py-3 flex items-center space-x-2">
            <span className="text-2xl font-bold">24+</span>
            <span>Years of service</span>
          </div>
        </div>
        
    </div>
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto grid lg:grid-cols-2 items-center gap-12">
        {/* Form Section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h3 className="text-green-600 text-3xl font-bold">Join Club</h3>
          <h1 className="text-4xl font-bold text-gray-800 mt-2">Join our club</h1>
          <form className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="text"
                placeholder="Your Phone *"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="url"
                placeholder="Website URL"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit Now
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative flex items-center justify-center">
          <img
            src="/assets/team4.jpg"
            alt="Golf Club"
            className="rounded-lg shadow-lg w-[600px] h-[400px]"
          />
        </div>
      </div>
    </section>

    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Meet Our Expert Trainers</h2>
          <p className="text-gray-600 mt-4">
            Our professional trainers are here to guide you every step of the way. Learn from the best in the field!
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              specialty: "Golf Trainer",
              image: "/assets/e1.jpg",
              description:
                "John specializes in advanced golf techniques and has over 15 years of experience coaching professionals and beginners.",
            },
            {
              name: "Jane Smith",
              specialty: "Fitness Coach",
              image: "/assets/e1.jpg",
              description:
                "Jane focuses on strength and flexibility training tailored for golfers of all levels.",
            },
            {
              name: "Michael Brown",
              specialty: "Mental Coach",
              image: "/assets/e1.jpg",
              description:
                "Michael helps golfers improve focus and manage stress for peak performance on the course.",
            },
          ].map((trainer, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 text-center flex flex-col items-center"
            >
              {/* Trainer Image */}
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-green-600 mb-4"
              />
              {/* Trainer Info */}
              <h3 className="text-xl font-bold text-gray-800">{trainer.name}</h3>
              <p className="text-green-600 font-medium">{trainer.specialty}</p>
              <p className="text-gray-600 mt-3">{trainer.description}</p>
              {/* Learn More Button */}
              <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Our Gallery</h2>
          <p className="text-gray-600 mt-4">
            Explore some of the memorable moments from our club. See the fun, joy, and activities we share!
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { image: "/assets/c1.jpg", caption: "Golf Championship 2024" },
            { image: "/assets/c2.jpg", caption: "Fitness Workshop" },
            { image: "/assets/c3.jpg", caption: "Community Picnic" },
            { image: "/assets/c2.jpg", caption: "Night Golf Event" },
            { image: "/assets/c3.jpg", caption: "Kids Golf Training" },
            { image: "/assets/c1.jpg", caption: "Annual Club Party" },
          ].map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
              />
              {/* Caption */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Our Achievements</h2>
          <p className="text-gray-600 mt-4">
            Over the years, we’ve earned recognition and accolades for our outstanding contribution to the golfing community.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🏆",
              title: "Best Golf Club Award",
              year: "2022",
              description: "Recognized as the top golf club in the region for exceptional services and facilities.",
            },
            {
              icon: "🥇",
              title: "Championship Wins",
              year: "2018 - 2023",
              description: "Home to multiple champions in regional and national tournaments.",
            },
            {
              icon: "🌟",
              title: "5-Star Membership Rating",
              year: "2021",
              description: "Rated 5 stars by our members for the quality of training, facilities, and events.",
            },
            {
              icon: "📈",
              title: "200% Growth in Members",
              year: "2020 - 2023",
              description: "Achieved significant growth in membership, making us a thriving community.",
            },
            {
              icon: "🎖️",
              title: "Certified Coaches",
              year: "2020",
              description: "Our team includes certified and award-winning golf coaches.",
            },
            {
              icon: "💼",
              title: "Corporate Partnerships",
              year: "2022",
              description: "Collaborated with top brands to bring exclusive events and services for members.",
            },
          ].map((achievement, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 text-center"
            >
              {/* Icon */}
              <div className="text-green-600 text-5xl mb-4">{achievement.icon}</div>
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800">{achievement.title}</h3>
              {/* Year */}
              <p className="text-green-600 font-medium mt-2">{achievement.year}</p>
              {/* Description */}
              <p className="text-gray-600 mt-3">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold text-green-500">About Us</h3>
          <p className="mt-4 text-gray-400">
            Sports Life is dedicated to providing exceptional facilities, training, and events for golf enthusiasts. Join us to be part of an inspiring community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-green-500">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Membership Plans
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Upcoming Events
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold text-green-500">Contact Us</h3>
          <p className="mt-4 text-gray-400">
            123 Golf Avenue, Green City, USA
          </p>
          <p className="mt-2 text-gray-400">Phone: +1 234 567 890</p>
          <p className="mt-2 text-gray-400">Email: info@sportslife.com</p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-500">
          © Walid EL FILALI 2025. All rights reserved.
        </p>
      </div>
    </footer>
    </div>


  );
};
export default Walid;
