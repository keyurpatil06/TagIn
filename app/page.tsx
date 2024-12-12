import About from "@/components/About";
import Discover from "@/components/Discover";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <Discover />
      <About />
    </main>
  );
}
