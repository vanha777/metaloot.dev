import { useState, useEffect } from "react";
import { FaUsers, FaWallet, FaGamepad, FaChartLine } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import TransactionTable from './TransactionTable';
import { Transaction } from './TransactionTable';

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

export default function AnalyticsSection() {
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
    <div className="space-y-6 p-8">
      <div className="flex items-center gap-3">
        <IoStatsChart className="text-3xl text-green" />
        <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-grey p-6 rounded-xl space-y-4">
              <div className="h-4 w-20 skeleton bg-slate-400/10"></div>
              <div className="h-8 w-32 skeleton bg-slate-400/10"></div>
            </div>
            <div className="bg-grey p-6 rounded-xl space-y-4">
              <div className="h-4 w-20 skeleton bg-slate-400/10"></div>
              <div className="h-8 w-32 skeleton bg-slate-400/10"></div>
            </div>
            <div className="bg-grey p-6 rounded-xl space-y-4">
              <div className="h-4 w-20 skeleton bg-slate-400/10"></div>
              <div className="h-8 w-32 skeleton bg-slate-400/10"></div>
            </div>
            <div className="bg-grey p-6 rounded-xl space-y-4">
              <div className="h-4 w-20 skeleton bg-slate-400/10"></div>
              <div className="h-8 w-32 skeleton bg-slate-400/10"></div>
            </div>
            <div className="bg-grey p-6 rounded-xl space-y-4 col-span-2 h-48">
              <div className="h-4 w-20 skeleton bg-slate-400/10"></div>
              <div className="h-8 w-32 skeleton bg-slate-400/10"></div>
              <div className="h-8 w-32 skeleton bg-slate-400/10"></div>
            </div>
            <div className="bg-grey p-6 rounded-xl space-y-4 col-span-2 h-48">
              <div className="h-4 w-20 skeleton bg-slate-400/10"></div>
              <div className="h-8 w-32 skeleton bg-slate-400/10"></div>
              <div className="h-8 w-32 skeleton bg-slate-400/10"></div>
            </div>
            <div className="bg-grey p-6 rounded-xl space-y-4 col-span-4 h-40">
              <div className="h-6 w-32 skeleton bg-slate-400/10"></div>
              <div className="h-6 w-full skeleton bg-slate-400/10"></div>
              <div className="h-6 w-full skeleton bg-slate-400/10"></div>
            </div>
        </div>
      ) : analytics ? (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-grey p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-xl text-green" />
                <h3 className="text-green">Players</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{analytics.playerStats.totalPlayers}</p>
              <p className="text-sm text-gray-400">
                +{analytics.playerStats.newPlayersThisWeek} this week
              </p>
            </div>

            <div className="bg-grey p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <FaWallet className="text-xl text-green" />
                <h3 className="text-green">Revenue</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                ${analytics.revenueMetrics.revenueFromTokenSales + analytics.revenueMetrics.revenueFromNFTSales}
              </p>
              <p className="text-sm text-gray-400">
                From token & NFT sales
              </p>
            </div>

            <div className="bg-grey p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <FaGamepad className="text-xl text-green" />
                <h3 className="text-green">Active Players</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{analytics.playerStats.activePlayers}</p>
              <p className="text-sm text-gray-400">
                {analytics.playerStats.retentionRate}% retention rate
              </p>
            </div>

            <div className="bg-grey p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <FaChartLine className="text-xl text-green" />
                <h3 className="text-green">Daily Transactions</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{analytics.tokenAnalytics.dailyTokenTransactions}</p>
              <p className="text-sm text-gray-400">
                Avg. ${analytics.tokenAnalytics.tokenDistribution.averageTransactionValue}
              </p>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-grey p-6 rounded-xl">
              <h3 className="text-xl text-white mb-4">Token Analytics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-1">Total Tokens Minted</p>
                  <p className="text-2xl font-bold text-white">{analytics.tokenAnalytics.totalTokensMinted}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Top 10 Players Ownership</p>
                  <p className="text-2xl font-bold text-white">{analytics.tokenAnalytics.tokenDistribution.top10PlayersOwnershipPercentage}%</p>
                </div>
              </div>
            </div>

            <div className="bg-grey p-6 rounded-xl">
              <h3 className="text-xl text-white mb-4">NFT Analytics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-1">Total NFTs Minted</p>
                  <p className="text-2xl font-bold text-white">{analytics.nftAnalytics.totalNFTsMinted}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Players with NFTs</p>
                  <p className="text-2xl font-bold text-white">{analytics.nftAnalytics.nftOwnershipStats.totalPlayersWithNFTs}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-grey rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl text-white">Recent Transactions</h3>
            </div>
            <TransactionTable transactions={analytics.recentTransactions} />
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No analytics data available.
        </div>
      )}
    </div>
  );
} 