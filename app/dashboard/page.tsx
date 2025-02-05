"use client";
import { AppProvider, useAppContext } from "@/app/utils/AppContext";
import MainUniverse from "./components/mainUniverse";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Db, Server } from "@/app/utils/db";
import SimpleLoading from "./components/simpleLoading";
import { set } from "date-fns";

export default function Dashboard() {
  const { auth, setTokens, setUser, setGame, setTokenData, logout } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = searchParams.get('user');
        console.log("this is oauth user", user);
        if (!user) {
          console.log("No user data found");
          router.push("/dashboard/login");
          return;
        }

        setIsLoading(true);
        const userData = JSON.parse(user);
        console.log("this is data", userData);

        // Fetch game data nad token_data from database
        // const { data: tokenData, error: tokenError } = await Db.from('tokens').select('*').eq('user_id', userData.id).single();
        const { data: gameData, error: gameError } = await Db.from('game_registries').select('*').eq('user_id', userData.id);
        if (gameData != null && gameData.length != 0) {
          // Fetch and parse URI data for each game
          const gameDataWithDetails = await Promise.all(gameData.map(async (game) => {
            try {
              const response = await fetch(game.game_uri);
              const uriData = await response.json();
              return {
                ...game,
                ...uriData
              };
            } catch (error) {
              console.error(`Error fetching URI data for game ${game.game_id}:`, error);
              return game;
            }
          }));
          console.log("gameDataWithDetails", gameDataWithDetails);
          const mappedGameData = gameDataWithDetails.map(game => ({
            id: game.game_id,
            name: game.name,
            photo: game.image || '',
            description: game.description || '',
            symbol: game.symbol || '',
            genre: game.attributes.find((attr: { trait_type: string; }) => attr.trait_type === 'genre')?.value || '',
            publisher: game.attributes.find((attr: { trait_type: string; }) => attr.trait_type === 'publisher')?.value || '',
            releaseDate: game.attributes.find((attr: { trait_type: string; }) => attr.trait_type === 'released_date')?.value || '',
            address: game.address
          }));
          setGame(mappedGameData);
        }
        // Add a timeout to ensure loading animation plays for at least 3 seconds
        // await new Promise(resolve => setTimeout(resolve, 3000));
        setUser(userData);
        // setTokenData(tokenData);
        // if (tokenError || gameError) {
        //   console.error('Error fetching data:', tokenError || gameError);
        //   router.push("/dashboard/login");
        //   return;
        // }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push("/dashboard/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, searchParams, setTokens, setUser, setGame]);

  if (isLoading) {
    return <SimpleLoading />;
  }

  return (
    <MainUniverse />
  );
}
