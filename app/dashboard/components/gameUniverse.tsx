'use client';

import { GameData, useAppContext } from "@/app/utils/AppContext";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CreateGameForm from "./createGameForm";

interface GameUniverseProps {
  setSelectedGame: (game: GameData) => void;
}

const GameUniverse = ({setSelectedGame }: GameUniverseProps) => {
  const { auth } = useAppContext();
  const games = auth.gameData ?? [];
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);
  const [isCreateOverlayOpen, setIsCreateOverlayOpen] = useState(false);

  // useEffect(() => {

  // }, [])


  return (
    <div className="relative bg-black w-full h-screen py-16">
      {/* Create Game Overlay */}
      {isCreateOverlayOpen && (
        <CreateGameForm setIsCreateOverlayOpen={setIsCreateOverlayOpen} />
      )}

      <div className="relative">
        <motion.div
          className="flex space-x-6 px-4 overflow-x-auto pb-8"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300
                ${expandedGameId === game.id ? 'w-[500px] h-[700px]' : 'w-[300px] h-[450px]'}`}
              onClick={() => setExpandedGameId(game.id ?? null)}
              layout
            >
              <div className="relative h-full rounded-2xl overflow-hidden 
                bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm
                border border-[#0CC0DF]/20">
                <img
                  src={game.photo}
                  alt={game.name}
                  className={`absolute inset-0 w-full h-full object-cover 
                    ${expandedGameId === game.id ? 'opacity-90' : 'opacity-40'}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t 
                  ${expandedGameId === game.id 
                    ? 'from-black/70 via-transparent to-transparent' 
                    : 'from-black/90 via-black/50 to-transparent'
                  }`} />

                <div className="absolute bottom-0 w-full p-8">
                  <h2 className="text-xl text-white font-light tracking-wider mb-2">
                    {game.name}
                  </h2>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-white/60">Genre:</span> <span className="text-white">{game.genre}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-white/60">Publisher:</span> <span className="text-white">{game.publisher}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-white/60">Release:</span> <span className="text-white">{game.releaseDate}</span>
                    </p>
                  </div>

                  {expandedGameId === game.id && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-black/80 border border-white/10 text-white 
                        font-light py-4 px-6 rounded-xl flex items-center justify-center gap-3
                        text-lg mt-6 hover:bg-white/10 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGame(game);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Select Game
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add New Game Card */}
          <motion.div
            className="relative flex-shrink-0 cursor-pointer w-[300px] h-[450px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateOverlayOpen(true)}
          >
            <div className="relative h-full rounded-2xl overflow-hidden 
              bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm
              border border-dashed border-[#0CC0DF]/40 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#0CC0DF]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                  Create New Game
                </h2>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameUniverse;
