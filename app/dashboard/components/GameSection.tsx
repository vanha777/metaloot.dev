import { useState, useEffect } from "react";
import { Game } from "@/app/types/game";
import { FaGhost, FaPencilAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { RiGameFill } from "react-icons/ri";
import Alert from "@/components/Alert";
import { IoGameControllerSharp } from "react-icons/io5";

export default function GameSection() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    gameName: '',
    symbol: '',
    nativeToken: '',
    nftCollection: '',
    metadataUri: ''
  });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setGames([
        {
          account: {
            data: {
              authority: "GA4jV9ESNBwjxQKs6HgoSebTFTMztacZPCYv8NCs8y8J",
              bump: 255,
              name: "Awesome Game 102",
              native_token: "Cn4wXAzcgCrdZXb3sd1mYr6jEhqbMtzZBU3PmQL5dLQW",
              nft_collection: "53pYFioA1nhDoLrM8rGJFN4r8J1p1pmHstcchvjEng2h",
              symbol: "AWSG101",
              uri: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/GameRegistry.json",
            },
            lamports: 3542640,
            owner: "v3MbKaZSQJrwZWUz81cQ3kc8XvMsiNNxZjM3vN5BB32",
            pubkey: "93hyS5N75W8d6pu9dXT7akgZgNRgq2L1LT9dEsLhEFgt",
          },
          status: "success",
        },
        {
          account: {
            data: {
              authority: "GA4jV9ESNBwjxQKs6HgoSebTFTMztacZPCYv8NCs8y8J",
              bump: 255,
              name: "Crypto Warriors",
              native_token: "Dk9wXAzcgCrdZXb3sd1mYr6jEhqbMtzZBU3PmQL5dLQW",
              nft_collection: "67pYFioA1nhDoLrM8rGJFN4r8J1p1pmHstcchvjEng2h",
              symbol: "CWAR",
              uri: "https://example.com/metadata/crypto-warriors.json",
            },
            lamports: 4542640,
            owner: "v3MbKaZSQJrwZWUz81cQ3kc8XvMsiNNxZjM3vN5BB32",
            pubkey: "82hyS5N75W8d6pu9dXT7akgZgNRgq2L1LT9dEsLhEFgt",
          },
          status: "success",
        },
      ]);
      setLoading(false);
    };

    fetchGames();
  }, []);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createGame = () => {
    if (!formData.gameName || !formData.symbol || !formData.metadataUri) {
        // Show error alert
        setAlert({
            show: true,
            message: 'Please fill in all required fields',
            type: 'error'
          });
          return;
    }

    console.log('Creating game with data:', formData);
    // Show success alert
    setAlert({
        show: true,
        message: 'Game created successfully!',
        type: 'success'
      });

      setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <IoGameControllerSharp className="text-3xl text-green" />
          <h2 className="text-2xl font-bold text-white">Game Management</h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green/90 group hover:bg-green border-green text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all"
          >
            <FaPlus className="text-sm text-white" />
            <span className="text-sm">New Game</span>
          </button>
        </div>
      </div>

      <div className="space-y-4 bg-slate-800/80 p-6 rounded-lg">
        {loading ? (
          <div className="space-y-2">
            {[1, 2].map((index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4">
                <div>
                  <div className="h-4 w-20 skeleton bg-slate-400/10 mb-2"></div>
                  <div className="h-6 w-32 skeleton bg-slate-400/10"></div>
                </div>
                <div>
                  <div className="h-4 w-20 skeleton bg-slate-400/10 mb-2"></div>
                  <div className="h-6 w-24 skeleton bg-slate-400/10"></div>
                </div>
                <div>
                  <div className="h-4 w-20 skeleton bg-slate-400/10 mb-2"></div>
                  <div className="h-6 w-40 skeleton bg-slate-400/10"></div>
                </div>
              </div>
            ))}
          </div>
        ) : games.length > 0 ? (
          <div className="space-y-2">
            {games.map((game, index) => (
              <>
                <div
                  key={index}
                  onClick={() => handleGameClick(game)}
                  className="grid grid-cols-3 gap-4 cursor-pointer hover:bg-slate-700/50 p-4 rounded-lg transition-colors"
                >
                  <div>
                    <h3 className="text-gray-300 text-sm">Game Name</h3>
                    <p className="text-white font-medium">{game.account.data.name}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-300 text-sm">Symbol</h3>
                    <p className="text-white font-medium">{game.account.data.symbol}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-300 text-sm">Owner</h3>
                    <p className="text-white font-medium truncate">{game.account.owner}</p>
                  </div>
                </div>
                {index < games.length - 1 && (
                  <hr className="my-2 border-t border-white/20 w-full" />
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-300 flex flex-col items-center justify-center">
            <FaGhost className="text-[#0CC0DF] text-4xl mb-2" />
            <p>No game data available. Create a new game to get started.</p>
          </div>
        )}
      </div>

      {/* Add Game Modal */}
      {showAddModal && (
        <div
          className="absolute w-full h-[calc(100vh-4rem)] inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-slate-800 p-8 rounded-lg w-full max-w-2xl m-4 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes className="text-2xl" />
            </button>
            <form className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-start"> <RiGameFill className="inline-block mr-2 text-3xl" />Add New Game</h2>
              <div className="grid grid-cols-2 gap-6">
              <div>
                  <h3 className="text-gray-400 mb-2 flex items-start gap-1">Game Name <span className="opacity-50 text-xs">*required</span></h3>
                  <input
                    type="text"
                    name="gameName"
                    value={formData.gameName}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                    placeholder="Enter game name"
                  />
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2 flex items-start gap-1">Token Symbol <span className="opacity-50 text-xs">*required</span></h3>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                    placeholder="Enter symbol"
                  />
                </div>
                <div className="">
                  <h3 className="text-gray-400 mb-2 flex items-start gap-1">Metadata URI <span className="opacity-50 text-xs">*required</span></h3>
                  <input
                    type="text"
                    name="metadataUri"
                    value={formData.metadataUri}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                    placeholder="Enter metadata URI"
                  />
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">Native Token</h3>
                  <input
                    type="text"
                    name="nativeToken"
                    value={formData.nativeToken}
                    onChange={handleChange}
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                    placeholder="Enter native token address"
                  />
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">NFT Collection</h3>
                  <input
                    type="text"
                    name="nftCollection"
                    value={formData.nftCollection}
                    onChange={handleChange}
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                    placeholder="Enter NFT collection address"
                  />
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">User Password</h3>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-slate-900/90 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green border border-slate-700/50"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </form>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-700">
              <button
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                onClick={() => setShowAddModal(false)}
              >
                <span className="text-sm">Cancel</span>
              </button>
              <button
                className="bg-green hover:bg-green/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                onClick={createGame}
              >
                <FaPlus className="text-sm" />
                <span className="text-sm">Create Game</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing View/Edit Modal */}
      {showModal && selectedGame && (
        <div
          className="absolute w-full h-[calc(100vh-4rem)] inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-slate-800 p-8 rounded-lg w-full max-w-2xl m-4 relative shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes className="text-2xl" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Game Details</h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400">Game Name</h3>
                <p className="text-white text-lg">
                  {selectedGame.account.data.name}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400">Symbol</h3>
                <p className="text-white text-lg">
                  {selectedGame.account.data.symbol}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400">Native Token</h3>
                <p className="text-white text-lg truncate">
                  {selectedGame.account.data.native_token}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400">NFT Collection</h3>
                <p className="text-white text-lg truncate">
                  {selectedGame.account.data.nft_collection}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400">Authority</h3>
                <p className="text-white text-lg truncate">
                  {selectedGame.account.data.authority}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400">Owner</h3>
                <p className="text-white text-lg truncate">
                  {selectedGame.account.owner}
                </p>
              </div>
              <div className="col-span-2">
                <h3 className="text-gray-400">Metadata URI</h3>
                <a
                  href={selectedGame.account.data.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0CC0DF] hover:underline truncate block"
                >
                  {selectedGame.account.data.uri}
                </a>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-700">
              <button
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                onClick={() => {
                  // Edit function
                }}
              >
                <FaPencilAlt className="text-lg" />
                <span>Edit Game</span>
              </button>
              <button
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                onClick={() => {
                  // Delete function
                }}
              >
                <FaTrash className="text-lg" />
                <span>Delete Game</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <Alert
        isOpen={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}
