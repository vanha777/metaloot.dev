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
    <div className="h-screen flex flex-col bg-black relative p-8">
      {/* Header Section */}
      <div className="text-center space-y-8 mb-16">
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-black border border-white/10 rounded-full 
                        flex items-center justify-center relative z-10">
            <img 
              src={selectedGame.photo || '/default-game-logo.png'} 
              alt={`${selectedGame.name} logo`}
              className="w-24 h-24 object-contain rounded-full"
              onError={(e) => {
                e.currentTarget.src = '/default-game-logo.png'
              }}
            />
          </div>
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0CC0DF]/20 to-[#14F195]/20 
                        blur-xl rounded-full transform scale-150 -z-0"></div>
        </div>

        <div className="space-y-2">
          <h2 className="text-white/60 text-sm tracking-wider">ANALYTICS DASHBOARD</h2>
          <h1 className="text-white text-5xl font-light tracking-wider">
            {selectedGame.name}
          </h1>
          <p className="text-white/40 text-xl">{selectedGame.genre}</p>
        </div>
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
        <div className="max-w-6xl mx-auto w-full">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-black/80 border border-white/10 p-6 rounded-2xl">
              <div className="text-white/60 text-sm">Total Players</div>
              <div className="text-2xl text-white font-light mt-2">
                {analytics.playerStats.totalPlayers.toLocaleString()}
              </div>
              <div className="text-green-400 text-sm mt-1">
                +{analytics.playerStats.newPlayersThisWeek} this week
              </div>
            </div>

            <div className="bg-black/80 border border-white/10 p-6 rounded-2xl">
              <div className="text-white/60 text-sm">Active Players</div>
              <div className="text-2xl text-white font-light mt-2">
                {analytics.playerStats.activePlayers.toLocaleString()}
              </div>
              <div className="text-white/40 text-sm mt-1">
                {analytics.playerStats.retentionRate}% retention
              </div>
            </div>

            <div className="bg-black/80 border border-white/10 p-6 rounded-2xl">
              <div className="text-white/60 text-sm">Total Revenue</div>
              <div className="text-2xl text-white font-light mt-2">
                ${(analytics.revenueMetrics.revenueFromTokenSales + 
                   analytics.revenueMetrics.revenueFromNFTSales).toLocaleString()}
              </div>
              <div className="text-white/40 text-sm mt-1">Combined sales</div>
            </div>

            <div className="bg-black/80 border border-white/10 p-6 rounded-2xl">
              <div className="text-white/60 text-sm">NFT Holders</div>
              <div className="text-2xl text-white font-light mt-2">
                {analytics.nftAnalytics.nftOwnershipStats.totalPlayersWithNFTs.toLocaleString()}
              </div>
              <div className="text-white/40 text-sm mt-1">Active wallets</div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-black/80 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl text-white font-light mb-6">Recent Transactions</h3>
            <TransactionTable transactions={analytics.recentTransactions} />
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-white/70">
          No analytics data available.
        </div>
      )}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] text-white/10">STATS</div>
        <div className="absolute top-[30%] right-[20%] text-white/10">DATA</div>
        <div className="absolute bottom-[25%] left-[25%] text-white/10">METRICS</div>
      </div>
    </div>
  );
} 