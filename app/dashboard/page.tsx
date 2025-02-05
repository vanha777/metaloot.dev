"use client";
import { AppProvider, useAppContext } from "@/app/utils/AppContext";
import MainUniverse from "./components/mainUniverse";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Db, Server } from "@/app/utils/db";
export default function Dashboard() {
  const { auth, setTokens, setUser, setGame, logout } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const user = searchParams.get('user');
      console.log("this is oauth user", user);
      if (!user) {
        console.log("No user data found");
        router.push("/dashboard/login");
        return;
      }

      const data = JSON.parse(user);
      console.log("this is data", data);
      // also needed to set Context
      // if (session_id) {
      //   let data = await Db.from('subscribers').select('*');
      //   console.log("this is data", data);
      // } else {
      //   console.log("No oauth session id found");
      //   router.push("/dashboard/login");
      // }
    };

    fetchData();
  }, [router, searchParams, setTokens, setUser, setGame]);
  return (
    <MainUniverse />
  );
}
