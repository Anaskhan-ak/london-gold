import { Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Featured from "./components/Featured";
import GoldRate from "./components/GoldRate";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function Home() {
  return (
    <Suspense>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Categories />
        <Featured />
        <GoldRate />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </Suspense>
  );
}
