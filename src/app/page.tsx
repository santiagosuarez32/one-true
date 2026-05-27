import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Associations from "@/components/Associations";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Resources from "@/components/Resources";
import Podcast from "@/components/Podcast";
import Ebook from "@/components/Ebook";
import Footer from "@/components/Footer";
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

      {/* Testimonials Section */}
      <Testimonials />

      {/* Resources / Blog Section */}
      <Resources />

      {/* Podcast Section */}
      <Podcast />

      {/* Ebook Section */}
      <Ebook />

      {/* Footer Section */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </main>
  );
}
