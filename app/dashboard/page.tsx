import { Suspense } from "react";
import SimpleLoading from "./components/simpleLoading";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";
import { UserData } from "../utils/AppContext";


export default function Dashboard({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const initialUser = searchParams.user;
  if (!initialUser) {
    return redirect("/dashboard/login");
  }
  const parsedUser = JSON.parse(initialUser) as UserData;
  console.log("parsedUser", parsedUser);
  return (
    <Suspense fallback={<SimpleLoading />}>
      <DashboardClient initialUser={parsedUser} />
    </Suspense>
  );
}
