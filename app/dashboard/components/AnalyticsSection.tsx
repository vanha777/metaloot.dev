import { useState, useEffect } from "react";

export default function AnalyticsSection() {
    const [totalPlayers, setTotalPlayers] = useState(1000);
    const [activeGames, setActiveGames] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        setTotalPlayers(1000);
        setActiveGames(10);
        setRevenue(10000);
    }, []);

  return (
    <div className="space-y-6 p-8">
      <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-grey p-6 rounded-xl">
            <h3 className="text-green text-lg">Total Players</h3>
            <p className="text-white text-3xl font-bold">{totalPlayers}</p>
          </div>
          <div className="bg-grey p-6 rounded-xl">
            <h3 className="text-green text-lg">Active Games</h3>
            <p className="text-white text-3xl font-bold">{activeGames}</p>
          </div>
          <div className="bg-grey p-6 rounded-xl">
            <h3 className="text-green text-lg">Revenue</h3>
            <p className="text-white text-3xl font-bold">{revenue}</p>
          </div>

      </div>
    </div>
  )
} 