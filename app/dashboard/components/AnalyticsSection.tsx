import { useState, useEffect } from "react";
import { FaUsers, FaWallet, FaGamepad, FaChartLine, FaCoins } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdNat } from "react-icons/md";
import TransactionTable from './TransactionTable';
import { Transaction } from './TransactionTable';
import { GameData } from "@/app/utils/AppContext";

interface AnalyticsData {
  playerStats: {
    totalPlayers: number;
    newPlayersThisWeek: number;
    activePlayers: number;
    retentionRate: number;
  };
  revenueMetrics: {
    revenueFromTokenSales: number;
    revenueFromNFTSales: number;
    marketplaceFeesEarned: number;
  };
  tokenAnalytics: {
    totalTokensMinted: number;
    dailyTokenTransactions: number;
    tokenDistribution: {
      top10PlayersOwnershipPercentage: number;
      averageTransactionValue: number;
    };
  };
  nftAnalytics: {
    totalNFTsMinted: number;
    nftOwnershipStats: {
      totalPlayersWithNFTs: number;
    };
  };
  recentTransactions: Transaction[];
}

export default function AnalyticsSection({ selectedGame }: { selectedGame: GameData }) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalytics({
        playerStats: {
          totalPlayers: 2430,
          newPlayersThisWeek: 145,
          activePlayers: 980,
          retentionRate: 65
        },
        revenueMetrics: {
          revenueFromTokenSales: 5600,
          revenueFromNFTSales: 2000,
          marketplaceFeesEarned: 300
        },
        tokenAnalytics: {
          totalTokensMinted: 50000,
          dailyTokenTransactions: 1200,
          tokenDistribution: {
            top10PlayersOwnershipPercentage: 30,
            averageTransactionValue: 150
          }
        },
        nftAnalytics: {
          totalNFTsMinted: 1200,
          nftOwnershipStats: {
            totalPlayersWithNFTs: 890
          }
        },
        
        recentTransactions: [
              {
                "transactionId": "0x1a2b3c4d",
                "timestamp": "2025-01-28T14:30:00Z",
                "fromWallet": "0x1234abcd",
                "toWallet": "0x5678efgh",
                "tokenAmount": 250,
                "transactionType": "Transfer",
                "gameName": "Battle Royale Arena",
                "status": "Success"
              },
              {
                "transactionId": "0x2b3c4d5e",
                "timestamp": "2025-01-28T13:45:00Z",
                "fromWallet": "0x9abc1234",
                "toWallet": "0x5678abcd",
                "tokenAmount": 150,
                "transactionType": "Transfer",
                "gameName": "Fantasy Quest",
                "status": "Success"
              },
              {
                "transactionId": "0x3c4d5e6f",
                "timestamp": "2025-01-28T12:15:00Z",
                "fromWallet": "0x1111aaaa",
                "toWallet": "0x2222bbbb",
                "tokenAmount": 500,
                "transactionType": "Mint",
                "gameName": "Epic Swords Adventure",
                "status": "Pending"
              },
              {
                "transactionId": "0x4d5e6f7g",
                "timestamp": "2025-01-28T11:00:00Z",
                "fromWallet": "0x3333cccc",
                "toWallet": "0x4444dddd",
                "tokenAmount": 75,
                "transactionType": "Transfer",
                "gameName": "Zombie Survival",
                "status": "Failed"
              },
              {
                "transactionId": "0x5e6f7g8h",
                "timestamp": "2025-01-28T10:30:00Z",
                "fromWallet": "0x5555eeee",
                "toWallet": "0x6666ffff",
                "tokenAmount": 300,
                "transactionType": "Burn",
                "gameName": "Fantasy Quest",
                "status": "Success"
              },
              {
                "transactionId": "0x6f7g8h9i",
                "timestamp": "2025-01-28T09:45:00Z",
                "fromWallet": "0x7777gggg",
                "toWallet": "0x8888hhhh",
                "tokenAmount": 200,
                "transactionType": "Transfer",
                "gameName": "Battle Royale Arena",
                "status": "Success"
              },
              {
                "transactionId": "0x7g8h9i0j",
                "timestamp": "2025-01-28T08:20:00Z",
                "fromWallet": "0x9999iiii",
                "toWallet": "0x1010jjjj",
                "tokenAmount": 125,
                "transactionType": "Mint",
                "gameName": "Epic Swords Adventure",
                "status": "Success"
              },
              {
                "transactionId": "0x8h9i0j1k",
                "timestamp": "2025-01-28T07:15:00Z",
                "fromWallet": "0x1212kkkk",
                "toWallet": "0x1313llll",
                "tokenAmount": 600,
                "transactionType": "Burn",
                "gameName": "Zombie Survival",
                "status": "Pending"
              },
              {
                "transactionId": "0x9i0j1k2l",
                "timestamp": "2025-01-28T06:50:00Z",
                "fromWallet": "0x1414mmmm",
                "toWallet": "0x1515nnnn",
                "tokenAmount": 50,
                "transactionType": "Transfer",
                "gameName": "Fantasy Quest",
                "status": "Failed"
              },
              {
                "transactionId": "0x0j1k2l3m",
                "timestamp": "2025-01-28T06:00:00Z",
                "fromWallet": "0x1616oooo",
                "toWallet": "0x1717pppp",
                "tokenAmount": 400,
                "transactionType": "Transfer",
                "gameName": "Battle Royale Arena",
                "status": "Success"
              }
            ]
          
      });
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6 p-2 md:p-8 bg-black min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <IoStatsChart className="text-3xl text-[#14F195]" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
          Analytics Overview
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white/5 p-4 md:p-6 rounded-xl space-y-4">
              <div className="h-4 md:w-20 w-20 skeleton bg-white/10"></div>
              <div className="h-5 md:w-32 w-24 skeleton bg-white/10"></div>
            </div>
            <div className="bg-white/5 p-4 md:p-6 rounded-xl space-y-4">
              <div className="h-4 md:w-20 w-20 skeleton bg-white/10"></div>
              <div className="h-5 md:w-32 w-24 skeleton bg-white/10"></div>
            </div>
            <div className="bg-white/5 p-4 md:p-6 rounded-xl space-y-4">
              <div className="h-4 md:w-20 w-20 skeleton bg-white/10"></div>
              <div className="h-5 md:w-32 w-24 skeleton bg-white/10"></div>
            </div>
            <div className="bg-white/5 p-4 md:p-6 rounded-xl space-y-4">
              <div className="h-4 md:w-20 w-20 skeleton bg-white/10"></div>
              <div className="h-5 md:w-32 w-24 skeleton bg-white/10"></div>
            </div>
            <div className="bg-white/5 p-4 md:p-6 rounded-xl space-y-4 col-span-2 h-48">
              <div className="h-4 md:w-20 w-20 skeleton bg-white/10"></div>
              <div className="h-5 md:w-32 w-24 skeleton bg-white/10"></div>
            </div>
            <div className="bg-white/5 p-4 md:p-6 rounded-xl space-y-4 col-span-2 h-48">
              <div className="h-4 md:w-20 w-20 skeleton bg-white/10"></div>
              <div className="h-5 md:w-32 w-24 skeleton bg-white/10"></div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl space-y-4 lg:col-span-4 col-span-2 hidden md:block h-40">
              <div className="h-6 w-32 skeleton bg-white/10"></div>
              <div className="h-6 w-full skeleton bg-white/10"></div>
              <div className="h-6 w-full skeleton bg-white/10"></div>
            </div>
        </div>
      ) : analytics ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Game Card - Spans full width */}
          <div className="md:col-span-3 bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-[#14F195]/30 transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/5 rounded-xl flex items-center justify-center">
                <img 
                  src={selectedGame.photo || '/default-game-logo.png'} 
                  alt={`${selectedGame.name} logo`}
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/default-game-logo.png'
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-3">{selectedGame.name}</h1>
                <div className="flex gap-3 text-white/70">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm">{selectedGame.genre}</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm">{selectedGame.symbol}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column - Publisher & Release Date */}
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-[#14F195]/30 transition-all duration-300 h-[200px]">
              <div className="flex items-center gap-3 mb-4">
                <FaGamepad className="text-xl text-[#14F195]" />
                <h3 className="text-xl bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                  Publisher
                </h3>
              </div>
              <p className="text-2xl font-bold text-white">
                {selectedGame.publisher || 'Unknown'}
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-[#14F195]/30 transition-all duration-300 h-[200px]">
              <div className="flex items-center gap-3 mb-4">
                <FaChartLine className="text-xl text-[#14F195]" />
                <h3 className="text-xl bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                  Release Date
                </h3>
              </div>
              <p className="text-2xl font-bold text-white">
                {selectedGame.releaseDate || 'TBA'}
              </p>
            </div>
          </div>

          {/* Center Column - Large Description Card */}
          <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-[#14F195]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <IoStatsChart className="text-xl text-[#14F195]" />
              <h3 className="text-xl bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                Game Description
              </h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              {selectedGame.description || 'No description available.'}
            </p>
          </div>

          {/* Right Column - Player Stats */}
          <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-[#14F195]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FaUsers className="text-xl text-[#14F195]" />
              <h3 className="text-xl bg-gradient-to-r from-[#0CC0DF] to-[#14F195] bg-clip-text text-transparent">
                Player Statistics
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-sm">Total Players</p>
                <p className="text-2xl font-bold text-white">{analytics.playerStats.totalPlayers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Active Players</p>
                <p className="text-2xl font-bold text-white">{analytics.playerStats.activePlayers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Retention Rate</p>
                <p className="text-2xl font-bold text-white">{analytics.playerStats.retentionRate}%</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-white/70">
          No analytics data available.
        </div>
      )}
    </div>
  );
} 