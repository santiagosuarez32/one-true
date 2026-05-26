import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Associations from "@/components/Associations";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Clients Marquee Section */}
      <Clients />

      {/* Services Section */}
      <Services />

      {/* Why Choose Us / Results Section */}
      <WhyChooseUs />

      {/* Associations Section */}
      <Associations />

      {/* Footer Section */}
      <section className="py-32 flex items-center justify-center bg-black border-t border-neutral-900">
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-neutral-800 to-white opacity-50 hover:opacity-100 transition-opacity duration-1000">
          The End.
        </h2>
      </section>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </main>
  );
}
