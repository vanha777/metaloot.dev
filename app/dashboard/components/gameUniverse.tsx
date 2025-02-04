'use client';

import { GameData } from "@/app/utils/AppContext";
import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameUniverseProps {
  games: GameData[];
  setSelectedGame: (game: GameData) => void;
}

const GameUniverse = ({ games, setSelectedGame }: GameUniverseProps) => {
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);
  const [isCreateOverlayOpen, setIsCreateOverlayOpen] = useState(false);
  
  // Add form state
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    publisher: '',
    releaseDate: '',
    photo: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your game creation logic here
    console.log('Form submitted:', formData);
    
    // Reset form and close overlay
    setFormData({
      name: '',
      genre: '',
      publisher: '',
      releaseDate: '',
      photo: ''
    });
    setIsCreateOverlayOpen(false);
  };

  return (
    <div className="relative bg-black w-full h-screen py-16">
      {/* Create Game Overlay */}
      {isCreateOverlayOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-[#0CC0DF]/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                Create New Game
              </h2>
              <button 
                onClick={() => setIsCreateOverlayOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Game Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Genre</label>
                <input 
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Publisher</label>
                <input 
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Release Date</label>
                <input 
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Game Cover Image URL</label>
                <input 
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 text-white focus:border-[#0CC0DF] focus:ring-1 focus:ring-[#0CC0DF] outline-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white font-bold py-3 px-6 rounded-xl 
                  shadow-lg shadow-[#0CC0DF]/30 transition-all duration-200"
              >
                Create Game
              </button>
            </form>
          </motion.div>
        </div>
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
              onClick={() => setExpandedGameId(game.id)}
              layout
            >
              <div className="relative h-full rounded-2xl overflow-hidden 
                bg-gradient-to-b from-[#0CC0DF]/10 to-transparent backdrop-blur-sm
                border border-[#0CC0DF]/20">
                <img
                  src={game.photo}
                  alt={game.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 w-full p-8">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent mb-2">
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
                      <span className="font-semibold text-[#0CC0DF]">Release:</span> {game.releaseDate}
                    </p>
                  </div>

                  {expandedGameId === game.id && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-[#0CC0DF] hover:bg-[#0AA0BF] text-white 
                        font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3
                        shadow-lg shadow-[#0CC0DF]/30 text-lg mt-4"
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
