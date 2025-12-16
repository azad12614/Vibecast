import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../images/Games.png";

const Colors = () => {
  const Reload = () => {
    window.location.reload();
  };

  const colors = [
    "aqua",
    "wheat",
    "crimson",
    "blue",
    "dodgerblue",
    "gold",
    "greenyellow",
    "teal",
  ];

  // Shuffle helper
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // State
  const [tiles, setTiles] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [msg, setMsg] = useState("Move Count : 0");

  // Initialize shuffled tiles once
  useEffect(() => {
    setTiles(shuffleArray([...colors, ...colors]));
  }, []);

  const handleClick = (index, tile) => {
    if (
      revealed.length === 2 ||
      revealed.includes(index) ||
      matched.includes(index)
    ) {
      return;
    }

    const newRevealed = [...revealed, index];
    setRevealed(newRevealed);
    setMoveCount((prev) => prev + 1);

    if (newRevealed.length === 2) {
      const [firstIdx, secondIdx] = newRevealed;
      if (tiles[firstIdx] === tiles[secondIdx]) {
        // Match found
        setMatched([...matched, firstIdx, secondIdx]);
        setRevealed([]);
      } else {
        // Not a match → flip back after delay
        setTimeout(() => {
          setRevealed([]);
        }, 1000);
      }
    }

    // Game over check
    if (moveCount + 1 > 32) {
      setMsg("Game Over! Please Reload!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    if (matched.length + 2 === tiles.length) {
      setMsg("Won The Game! Please Reload!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    setMsg(`Move Count : ${moveCount + 1}`);
  };

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-transparent z-40 overflow-hidden">
        <img
          src={Hero}
          alt="Games Banner"
          className="w-full h-[70vh] object-cover brightness-[25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-white font-cosmic">
            Color Matching Game
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl px-4">
            Match all the colors in {32 - moveCount} moves.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative bg-black min-h-screen m-auto items-center justify-center">
        <div
          id="tiles"
          className="max-w-lg grid grid-cols-4 grid-rows-4 gap-1 m-auto"
        >
          {tiles.map((tile, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-28 w-28 border border-white cursor-pointer"
              onClick={() => handleClick(index, tile)}
              style={{
                background:
                  revealed.includes(index) || matched.includes(index)
                    ? tile
                    : "gray",
              }}
            ></div>
          ))}
        </div>
        <div
          id="msg"
          className="font-mono font-thin text-xl text-error mt-4 text-center"
        >
          {msg}
        </div>
        <button
          id="reload-button"
          onClick={Reload}
          className="bg-primary-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 border border-primary-600 flex items-center gap-3 m-auto mt-5"
        >
          <span>Restart Game</span>
        </button>
      </main>
    </>
  );
};

export default Colors;
