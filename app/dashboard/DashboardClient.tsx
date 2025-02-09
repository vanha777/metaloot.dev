"use client";
import { AppProvider, useAppContext, UserData } from "@/app/utils/AppContext";
import MainUniverse from "./components/mainUniverse";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Db, Server } from "@/app/utils/db";
import SimpleLoading from "./components/simpleLoading";
import { set } from "date-fns";

interface InitialUserProps {
    initialUser: UserData;
}

export default function DashboardClient({ initialUser }: InitialUserProps) {
    const { auth, setAccessToken, setUser, setGame, setTokenData, logout } = useAppContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                console.log("this is data", initialUser);
                // Fetch game data
                const { data: gameData, error: gameError } = await Db.from('game_registries').select('*').eq('user_id', initialUser.id);
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
                setUser(initialUser);
            } catch (error) {
                console.error('Error fetching data:', error);
                router.push("/dashboard/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [initialUser]);

    return isLoading ? <SimpleLoading /> : <MainUniverse />;
}
