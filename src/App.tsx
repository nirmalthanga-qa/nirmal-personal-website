import { useCallback, useEffect, useRef, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { Facts } from "./components/Facts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro, type IntroPhase } from "./components/Intro";
import { Hero } from "./components/Hero";
import { MenuOverlay } from "./components/MenuOverlay";
import { WhoAmI } from "./components/WhoAmI";
import { site } from "./data/site";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { Favorites } from "./components/Favorites";
import { Automotive } from "./components/Automotive";
import { SocialSidebar } from "./components/SocialSidebar";

export default function App() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>(
    site.intro && !reduced ? "in" : "done",
  );
  const burger = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    document.body.classList.toggle("intro", phase === "in");
  }, [phase]);

  useEffect(() => {
    document.body.classList.toggle("menu", open);
    document.body.classList.toggle("lock", open || phase !== "done");
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, phase]);

  return (
    <>
      <Intro phase={phase} setPhase={setPhase} />
      <Header ref={burger} open={open} onToggle={toggle} />
      <MenuOverlay open={open} onNavigate={close} />
      <main>
        <Hero play={phase !== "in"} />
        <WhoAmI />
        <Facts />
        <Favorites />
        <Automotive />
      </main>
      <SocialSidebar />
      <Footer />
      <BackToTop />
    </>
  );
}
