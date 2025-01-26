import { useState } from "react";
import { Game } from "@/app/types/game";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

export default function GameSection() {
    const [game, setGame] = useState<Game | null>(null);
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Game Management</h2>
                <div className="flex gap-4">
                    <button className="bg-[#14F195] text-[#071A2F] px-6 py-3 rounded-lg font-bold">
                        Create New Game
                    </button>
                    <button className="bg-[#0CC0DF] text-[#071A2F] px-6 py-3 rounded-lg font-bold ml-4">
                        Update Game Info
                    </button>
                </div>
            </div>

            <div className="space-y-4 bg-[#0A2540] p-6 rounded-lg">
                {game ? (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-gray-400">Game Name</h3>
                                <p className="text-white text-lg">{game.account.data.name}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400">Symbol</h3>
                                <p className="text-white text-lg">{game.account.data.symbol}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400">Native Token</h3>
                                <p className="text-white text-lg truncate">{game.account.data.native_token}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400">NFT Collection</h3>
                                <p className="text-white text-lg truncate">{game.account.data.nft_collection}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400">Authority</h3>
                                <p className="text-white text-lg truncate">{game.account.data.authority}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400">Owner</h3>
                                <p className="text-white text-lg truncate">{game.account.owner}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-gray-400">Metadata URI</h3>
                            <a href={game.account.data.uri} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-[#0CC0DF] hover:underline truncate block">
                                {game.account.data.uri}
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        <FontAwesomeIcon icon={faGhost} className="text-[#0CC0DF] text-4xl mb-2" />
                        <p>No game data available. Create a new game to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
