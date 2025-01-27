import { useState, useEffect } from "react";
import { Game } from "@/app/types/game";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faPencil, faPlus, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function GameSection() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
        }
      ]);
      setLoading(false);
    };

    fetchGames();
  }, []);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col gap-6 p-8 min-h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Game Management</h2>
        <div className="flex gap-4">
          <button className="bg-[#14F195] hover:bg-[#14F195]/80 text-[#071A2F] px-6 py-3 rounded-lg font-medium flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} className="text-lg text-[#071A2F]" />
            <span className="text-lg">New Game</span>
          </button>
        </div>
      </div>

      <div className="space-y-4 bg-[#071A2F] p-6 rounded-lg">
        {loading ? (
          <div className="space-y-2">
            {[1, 2].map((index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4">
                <div>
                  <div className="h-4 w-20 skeleton bg-[#0A2540] mb-2"></div>
                  <div className="h-6 w-32 skeleton bg-[#0A2540]"></div>
                </div>
                <div>
                  <div className="h-4 w-20 skeleton bg-[#0A2540] mb-2"></div>
                  <div className="h-6 w-24 skeleton bg-[#0A2540]"></div>
                </div>
                <div>
                  <div className="h-4 w-20 skeleton bg-[#0A2540] mb-2"></div>
                  <div className="h-6 w-40 skeleton bg-[#0A2540]"></div>
                </div>
              </div>
            ))}
          </div>
        ) : games.length > 0 ? (
          <div className="space-y-2">
            {games.map((game, index) => (
              <div 
                key={index}
                onClick={() => handleGameClick(game)}
                className="grid grid-cols-3 gap-4 cursor-pointer hover:bg-[#0A2540] p-4 rounded-lg transition-colors"
              >
                <div>
                  <h3 className="text-gray-400 text-sm">Game Name</h3>
                  <p className="text-white">{game.account.data.name}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Symbol</h3>
                  <p className="text-white">{game.account.data.symbol}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Owner</h3>
                  <p className="text-white truncate">{game.account.owner}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <FontAwesomeIcon
              icon={faGhost}
              className="text-[#0CC0DF] text-4xl mb-2"
            />
            <p>No game data available. Create a new game to get started.</p>
          </div>
        )}
      </div>
        
      {/* Modal */}
      {showModal && selectedGame && (
        <div className="absolute w-full h-[calc(100vh-4rem)] inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#071A2F] p-8 rounded-lg w-full max-w-2xl m-4 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} className="text-2xl" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">Game Details</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400">Game Name</h3>
                <p className="text-white text-lg">{selectedGame.account.data.name}</p>
              </div>
              <div>
                <h3 className="text-gray-400">Symbol</h3>
                <p className="text-white text-lg">{selectedGame.account.data.symbol}</p>
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

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
              <button 
                className="bg-[#071A2F] hover:bg-[#0A2540] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                onClick={() => {
                  // Edit function
                }}
              >
                <FontAwesomeIcon icon={faPencil} className="text-lg" />
                <span>Edit Game</span>
              </button>
              <button 
                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                onClick={() => {
                  // Delete function
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="text-lg" />
                <span>Delete Game</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
