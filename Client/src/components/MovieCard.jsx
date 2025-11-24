import React, { useState } from "react";

const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w500";

  const getRatingColor = (rating) => {
    if (rating >= 8) return "bg-gradient-to-r from-green-500 to-emerald-600";
    if (rating >= 7) return "bg-gradient-to-r from-yellow-500 to-amber-600";
    if (rating >= 6) return "bg-gradient-to-r from-orange-500 to-red-500";
    return "bg-gradient-to-r from-red-500 to-pink-600";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Coming Soon";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group cursor-pointer">
      <div className="bg-black rounded-xl overflow-hidden shadow-lg border border-gray-700 group-hover:border-primary-600 group-hover:shadow-glow-primary transition-all duration-300 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[1/1] overflow-hidden bg-gradient-to-br from-dark-900 to-gray-800">
          {movie.poster_path && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-900">
                  <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                alt={movie.title}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dark-900 to-gray-800 text-white p-4">
              <div className="text-4xl mb-2 opacity-60">🎬</div>
              <p className="text-center text-sm font-medium text-gray-400">
                No Image
              </p>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>

          {/* Top Info Bar */}
          <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
            {/* Rating Badge */}
            <div
              className={`${getRatingColor(
                movie.vote_average
              )} text-white px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm border border-white/20`}
            >
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </div>

            {/* Like Button */}
            <button
              onClick={toggleLike}
              className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                isLiked
                  ? "bg-red-500/90 text-white"
                  : "bg-black/90 text-gray-300 hover:text-white"
              }`}
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Release Date */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-black/90 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm border border-white/20">
              {formatDate(movie.release_date)}
            </div>
          </div>
        </div>

        {/* Content Area - Compact */}
        <div className="p-4 flex flex-col flex-1 bg-black">
          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary-300 transition-colors duration-300">
            {movie.title}
          </h3>

          {/* Quick Stats Row */}
          <div className="flex items-center justify-between mb-3">
            {/* Popularity */}
            <div className="flex items-center gap-1">
              <span className="text-primary-400 text-sm">🔥</span>
              <span className="text-white text-xs font-medium">
                {Math.round(movie.popularity)}
              </span>
            </div>

            {/* Votes */}
            <div className="flex items-center gap-1">
              <span className="text-primary-400 text-sm">👥</span>
              <span className="text-white text-xs font-medium">
                {(movie.vote_count || 0).toLocaleString()}
              </span>
            </div>

            {/* Genres Count */}
            <div className="flex items-center gap-1">
              <span className="text-primary-400 text-sm">🎭</span>
              <span className="text-white text-xs font-medium">
                {movie.genre_ids?.length || 0}
              </span>
            </div>
          </div>

          {/* Overview - Shorter */}
          <p className="text-gray-400 text-xs mb-1 line-clamp-2 leading-relaxed flex-1">
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
