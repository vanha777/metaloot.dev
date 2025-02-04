'use client';

import { GameData } from "@/app/utils/AppContext";
import { useState } from 'react';
import { motion } from 'framer-motion';

const GameUniverse = ({ games }: { games: GameData[] }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="relative bg-[#010205] w-full py-16">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#010205] via-[#010205]/90 to-[#010205]" />
        
        {/* Grid lines can be added here similar to your example if desired */}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <motion.div
              key={game.id}
              className={`relative w-full h-[500px] cursor-pointer transition-transform duration-300 ${
                selectedGame === game.id ? 'scale-105 ring-2 ring-[#0CC0DF]' : ''
              }`}
              onClick={() => setSelectedGame(game.id)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden">
                <div className="relative w-full h-full">
                  <img
                    src={game.photo}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="absolute bottom-0 w-full p-4 space-y-2">
                      <h2 className="text-xl font-bold bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                        {game.name}
                      </h2>
                      <div className="space-y-1 text-gray-200">
                        <p className="text-sm">
                          <span className="font-semibold text-[#0CC0DF]">Genre:</span> {game.genre}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#0CC0DF]">Publisher:</span> {game.publisher}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#0CC0DF]">Release:</span>{' '}
                          {game.releaseDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameUniverse;
