import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import GameCard from "../../components/GameCard";
import Spinner from "../../components/Spinner";
import Hero from "../../images/Hero.png";

const MOVIE_API_KEY = import.meta.env.VITE_TMDB_MOVIE_API_KEY;
const GAME_API_KEY = import.meta.env.VITE_RAWG_GAME_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${MOVIE_API_KEY}`,
  },
};

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("movies");

  // Utility function to get current date with optional offset in days
  function currentDate(offsetDays = 0) {
    const today = new Date();
    today.setDate(today.getDate() + offsetDays); // add/subtract days
    return today;
  }

  // Usage
  const min_date = currentDate(-180); // 180 days ago
  const max_date = currentDate(); // today

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        // Fetch trending movies
        const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2&release_date.gte=${min_date}&release_date.lte=${max_date}`;
        const moviesResponse = await fetch(endpoint, API_OPTIONS);
        const moviesData = await moviesResponse.json();

        // Fetch popular games
        const gamesResponse = await fetch(
          `https://api.rawg.io/api/games?key=${GAME_API_KEY}&ordering=-rating&page_size=4&genres=rpg,action`
        );
        const gamesData = await gamesResponse.json();

        setTrendingMovies(moviesData.results?.slice(0, 4) || []);
        setPopularGames(gamesData.results?.slice(0, 4) || []);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const stats = [
    { number: "10K+", label: "Movies", icon: "🎬" },
    { number: "5K+", label: "Games", icon: "🎮" },
  ];

  const features = [
    {
      icon: "🔍",
      title: "Advanced Search",
      description:
        "Find exactly what you're looking for with powerful search filters",
    },
    {
      icon: "⭐",
      title: "Ratings & Reviews",
      description:
        "See what others think with integrated ratings and user reviews",
    },
    {
      icon: "💾",
      title: "Watchlists",
      description: "Save your favorite content and never miss a release",
    },
    {
      icon: "📱",
      title: "Multi-Platform",
      description: "Access your content across all your devices seamlessly",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-transparent z-40 overflow-hidden">
        <img
          src={Hero}
          alt="Vibecast Entertainment"
          className="w-full h-[80vh] object-cover brightness-[30%]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-4">
          <div className="text-center max-w-4xl">
            <h1
              className="text-5xl lg:text-7xl font-bold mb-1  text-[#7b024d]"
              style={{ fontFamily: "MagnificoDaytime, sans-serif" }}
            >
              VIBECAST
            </h1>
            <p
              className="text-uppercase text-2xl lg:text-3xl  text-[#7b024d] mb-3 font-light"
              style={{ fontFamily: "Cosmic, sans-serif" }}
            >
              Your Ultimate Entertainment Network
            </p>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover, explore, and enjoy the world of movies, games all in one
              place
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/movies"
                className="bg-primary-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 border border-primary-600 flex items-center gap-3"
              >
                <span>Explore Movies</span>
                <span className="text-xl">🎬</span>
              </Link>
              <Link
                to="/games"
                className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dark-700 transition-all duration-300 transform hover:scale-105 border border-gray-600 flex items-center gap-3"
              >
                <span>Discover Games</span>
                <span className="text-xl">🎮</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-24 text-black/90"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative bg-black min-h-screen -mt-1">
        {/* Stats Section */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl lg:text-4xl font-bold text-white font-cosmic mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-cosmic mb-4">
                Trending Now
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover what's popular across movies and games
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-black rounded-xl p-1 border border-gray-700">
                <button
                  onClick={() => setActiveTab("movies")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "movies"
                      ? "bg-primary-gradient text-white shadow-glow-primary"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  🎬 Movies
                </button>
                <button
                  onClick={() => setActiveTab("games")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "games"
                      ? "bg-primary-gradient text-white shadow-glow-primary"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  🎮 Games
                </button>
              </div>
            </div>

            {/* Content Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Spinner />
                  <p className="text-gray-400 mt-4 text-lg">
                    Loading trending content...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {activeTab === "movies" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
                    {trendingMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}

                {activeTab === "games" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
                    {popularGames.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link
                to={activeTab === "movies" ? "/movies" : "/games"}
                className="bg-black text-white px-8 py-3 rounded-lg border border-gray-700 hover:border-primary-500 hover:shadow-glow-primary transition-all duration-300 font-semibold inline-flex items-center gap-2"
              >
                View All {activeTab === "movies" ? "Movies" : "Games"}
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-cosmic mb-4">
                Why Choose Vibecast?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need for your entertainment journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-black rounded-xl p-6 border border-gray-700 hover:border-primary-600 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white font-cosmic mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users discovering their next favorite movie,
              game
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/movies"
                className="bg-primary-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 border border-primary-600"
              >
                Get Started Now
              </Link>
              <Link
                to="/about"
                className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dark-700 transition-all duration-300 transform hover:scale-105 border border-gray-600"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
