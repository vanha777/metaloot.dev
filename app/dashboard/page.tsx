"use client";
import { AppProvider, useAppContext } from "@/app/utils/AppContext";
import MainUniverse from "./components/mainUniverse";

export default function Dashboard() {

  return (
    <AppProvider>
      <MainUniverse />
    </AppProvider>
  );
}
