import React, { useState } from "react";

const GameCard = ({ game }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "bg-gradient-to-r from-green-500 to-emerald-600";
    if (rating >= 4.0) return "bg-gradient-to-r from-yellow-500 to-amber-600";
    if (rating >= 3.5) return "bg-gradient-to-r from-orange-500 to-red-500";
    return "bg-gradient-to-r from-red-500 to-pink-600";
  };

  const getMetacriticColor = (score) => {
    if (!score) return "bg-gray-600";
    if (score >= 90) return "bg-green-600";
    if (score >= 75) return "bg-yellow-600";
    if (score >= 50) return "bg-orange-600";
    return "bg-red-600";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Coming Soon";
    return new Date(dateString).getFullYear();
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group cursor-pointer border-1 rounded-lg hover:shadow-glow-primary transition-all duration-300 h-full">
      <div className="bg-black rounded-xl overflow-hidden shadow-lg border border-black group-hover:border-primary-600 group-hover:shadow-glow-primary transition-all duration-300 flex flex-col min-h-[100px] h-full">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-dark-900 to-gray-800">
          {game.background_image && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-900">
                  <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={game.background_image}
                alt={game.name}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dark-900 to-gray-800 text-white p-4">
              <div className="text-4xl mb-2 opacity-60">🎮</div>
              <p className="text-center text-sm font-medium text-gray-400">
                No Image
              </p>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>

          {/* Top Info Bar */}
          <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
            {/* Metacritic Score */}
            {game.metacritic && (
              <div
                className={`${getMetacriticColor(
                  game.metacritic
                )} text-white px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm border border-white/20`}
              >
                {game.metacritic}
              </div>
            )}

            {/* Like Button */}
            <button
              onClick={toggleLike}
              className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                isLiked
                  ? "bg-red-500/90 text-white"
                  : "bg-dark-800/90 text-gray-300 hover:text-white"
              }`}
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            {/* Game Rating */}
            <div className="flex items-center justify-between mb-2">
              <div
                className={`${getRatingColor(
                  game.rating
                )} text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/20 flex items-center gap-1`}
              >
                <span>⭐</span>
                <span>{game.rating?.toFixed(1)}</span>
              </div>

              {/* Release Year */}
              <div className="bg-dark-800/90 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/20">
                {formatDate(game.released)}
              </div>
            </div>

            {/* Platforms - Text based */}
            {game.parent_platforms && game.parent_platforms.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {game.parent_platforms.slice(0, 3).map(({ platform }) => (
                  <span
                    key={platform.id}
                    className="bg-black/70 text-white px-2 py-1 rounded text-xs border border-primary-600 backdrop-blur-sm"
                  >
                    {platform.name}
                  </span>
                ))}
                {game.parent_platforms.length > 3 && (
                  <span className="bg-black/90 text-gray-300 px-2 py-1 rounded text-xs border border-gray-600 backdrop-blur-sm">
                    +{game.parent_platforms.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-1 bg-black">
          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary-300 transition-colors duration-300">
            {game.name}
          </h3>
          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-3">
            {game.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="bg-black text-gray-300 px-2 py-1 rounded text-xs border border-gray-600"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
