import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LandingPage from "@/components/LandingPage";

export default async function HomePage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return <LandingPage />;
}
