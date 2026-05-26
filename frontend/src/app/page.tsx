import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandShowcase from "@/components/BrandShowcase";
import ValueProps from "@/components/ValueProps";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BrandShowcase />
        <ValueProps />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}
