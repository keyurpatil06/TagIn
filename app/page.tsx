import About from "@/components/About";
import Discover from "@/components/Discover";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/sign-in')

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <HeroSection />
      <Discover />
      <About />
    </main>
  );
}
