import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import WhatIDo from "@/components/WhatIDo";
import Arsenal from "@/components/Arsenal";
import SelectedWork from "@/components/SelectedWork";
import Awards from "@/components/Awards";
import ClientReviews from "@/components/ClientReviews";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Custom cursor — global scope */}
      <CustomCursor />

      {/* Sticky navigation */}
      <NavBar />

      <main>
        {/* Core: scroll-linked canvas image sequence (hero) */}
        <ScrollyCanvas />

        {/* 001 — What I Do (services / capabilities) */}
        <WhatIDo />

        {/* 002 — My Arsenal (tech stack marquee) */}
        <Arsenal />

        {/* 003 — Selected Work (projects) */}
        <SelectedWork />

        {/* 004 — Awards & Recognition */}
        <Awards />

        {/* 005 — Client Reviews (auto-scroll marquee) */}
        <ClientReviews />

        {/* 006 — About Me */}
        <AboutSection />

        {/* 007 — Contact */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
