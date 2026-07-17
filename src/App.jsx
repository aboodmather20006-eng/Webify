import WebifyHero from "./components/WebifyHero.jsx";
import WorkSection from "./components/WorkSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import ProcessSection from "./components/ProcessSection.jsx";
import CTASection from "./components/CTASection.jsx";
import SiteBackground from "./components/SiteBackground.jsx";

export default function App() {
  return (
    /* bg-black base + one shared atmosphere layer behind every section.
       overflow-x-clip: slide-in cards start with an x-offset and must never
       create horizontal scroll (clip, unlike hidden, keeps sticky working) */
    <main className="relative overflow-x-clip bg-black">
      <SiteBackground />
      <div className="relative">
        <WebifyHero />
        <WorkSection />
        <ServicesSection />
        <ProcessSection />
        <CTASection />
      </div>
    </main>
  );
}
