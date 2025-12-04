import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const errorCharacters = ["🎬", "🎮", "📚", "👾", "🌟", "🎥", "🕹️", "📺"];
  const [characters, setCharacters] = React.useState([]);

  React.useEffect(() => {
    // Create a random scattering of characters
    const randomChars = [];
    for (let i = 0; i < 25; i++) {
      randomChars.push({
        char: errorCharacters[
          Math.floor(Math.random() * errorCharacters.length)
        ],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      });
    }
    setCharacters(randomChars);
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative bg-dark-900 min-h-screen overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {characters.map((char, index) => (
            <div
              key={index}
              className="absolute animate-pulse"
              style={{
                left: `${char.x}%`,
                top: `${char.y}%`,
                fontSize: `${char.size}rem`,
                animationDelay: `${char.delay}s`,
              }}
            >
              {char.char}
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900"></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-40">
          {/* Animated 404 */}
          <div className="mb-8 relative">
            <div className="text-9xl lg:text-[12rem] font-bold text-white font-cosmic leading-none">
              <span className="text-primary-500 animate-pulse">4</span>
              <span className="text-primary-400">0</span>
              <span className="text-primary-300 animate-pulse">4</span>
            </div>

            {/* Floating characters around 404 */}
            <div className="absolute -top-4 -left-4 text-3xl animate-bounce">
              🎬
            </div>
            <div
              className="absolute -top-4 -right-4 text-3xl animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              🎮
            </div>
            <div
              className="absolute -bottom-4 -left-8 text-3xl animate-bounce"
              style={{ animationDelay: "1s" }}
            >
              📚
            </div>
            <div
              className="absolute -bottom-4 -right-8 text-3xl animate-bounce"
              style={{ animationDelay: "1.5s" }}
            >
              🏠
            </div>
          </div>

          {/* Main message */}
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-cosmic">
            <span className="text-primary-300">Content</span> Not Found
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Looks like this movie ended early, this game hasn't been released
            yet.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/"
              className="bg-primary-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 border border-primary-600 flex items-center justify-center gap-3"
            >
              <span>Return Home</span>
              <span className="text-xl">🏠</span>
            </Link>

            <Link
              to="/movies"
              className="bg-dark-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dark-700 transition-all duration-300 transform hover:scale-105 border border-gray-600 flex items-center justify-center gap-3"
            >
              <span>Browse Movies</span>
              <span className="text-xl">🎬</span>
            </Link>

            <Link
              to="/games"
              className="bg-dark-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dark-700 transition-all duration-300 transform hover:scale-105 border border-gray-600 flex items-center justify-center gap-3"
            >
              <span>Explore Games</span>
              <span className="text-xl">🎮</span>
            </Link>
          </div>

          {/* Search suggestion */}
          <div className="max-w-md w-full">
            <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-white text-lg font-semibold mb-3">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                Try searching in our main sections:
              </p>
              <div className="flex flex-wrap gap-2 justify-center text-white">
                {["Movies", "Games", "Trending", "New Releases"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="bg-primary-900/30 text-primary-300 px-4 py-2 rounded-lg text-sm hover:bg-primary-800 hover:text-white transition-colors duration-300 border border-primary-700"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              If you believe this is an error, please{" "}
              <Link
                to="/contact"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                contact support
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
