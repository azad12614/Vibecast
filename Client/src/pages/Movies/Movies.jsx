import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import MovieCard from "../../components/MovieCard";
import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import Spinner from "../../components/Spinner";
import Hero from "../../images/Movies.png";

const MOVIE_BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_API_KEY = import.meta.env.VITE_TMDB_MOVIE_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${MOVIE_API_KEY}`,
  },
};

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    1000,
    [searchTerm]
  );

  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      setErrorMsg("");
      const endpoint = query
        ? `${MOVIE_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${MOVIE_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      if (!data.results) {
        setErrorMsg("No movies found");
        setMovieList([]);
        return;
      }

      setMovieList(data.results);
    } catch (error) {
      console.log("Error fetching movies:", error);
      setErrorMsg("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <>
      <Navbar />
      {/* Hero Section with Perfect Curve */}
      <div className="relative bg-transparent z-40 overflow-hidden">
        <img
          src={Hero}
          alt="Movies Banner"
          className="w-full h-[70vh] object-cover brightness-[25%]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-white font-cosmic">
            Discover Movies
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl px-4">
            Explore thousands of movies, from classics to latest releases
          </p>
          <div className="w-full max-w-2xl px-4">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search Movies"
            />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Header Section */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white font-cosmic mb-2">
                  {debouncedSearchTerm
                    ? `Search Results for "${debouncedSearchTerm}"`
                    : "Popular Movies"}
                </h2>
                <p className="text-gray-400 text-lg">
                  {movieList.length}{" "}
                  {movieList.length === 1 ? "movie" : "movies"} found
                </p>
              </div>
            </div>
          </section>

          {/* Movies Grid */}
          <section>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Spinner />
                  <p className="text-gray-400 mt-4 text-lg">
                    Loading movies...
                  </p>
                </div>
              </div>
            ) : errorMsg ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-red-400 text-xl mb-4">{errorMsg}</p>
                <button
                  onClick={() => fetchMovies()}
                  className="bg-primary-gradient text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow-primary transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {movieList.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-400 text-xl mb-4">
                      No movies found
                    </p>
                    <p className="text-gray-500">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
                    {movieList.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Movies;
