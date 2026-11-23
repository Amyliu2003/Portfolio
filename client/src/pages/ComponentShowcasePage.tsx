import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { Controls, SortOption } from "../components/Controls";
import { Footer } from "../components/Footer";
import { LoginModal } from "../components/LoginModal";
import { AddProjectModal } from "../components/AddProjectModal";
import { ShowcaseSection } from "../components/showcase/ShowcaseSection";
import { initialProjects } from "../data/projects";
import { tools } from "../tools/data/tools";
import { StatusBadge } from "../tools/components/StatusBadge";
import { useDocumentTitle } from "../utils/useDocumentTitle";
import { ToolCard } from "../tools/components/ToolCard";
import { COLORS, GRADIENTS } from "../utils/theme";

const DEMO_TAGS: [string, number][] = [
  ["React", 8],
  ["UI/UX", 6],
  ["TypeScript", 5],
  ["Installation", 3],
  ["RAG", 2],
];

const demoProject = initialProjects.find((p) => p.type === "special")!;

/** Break out of max-w-6xl so components render at full app width */
function ShowcaseFullBleed({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw]">
      {children}
    </div>
  );
}

export function ComponentShowcasePage() {
  useDocumentTitle("Component Showcase");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>(["React"]);
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<"tray" | "grid">("tray");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const handleTagClick = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div
      className="min-h-dvh w-full font-['Tinos',_serif] selection:bg-[#BA76FF] selection:text-white"
      style={
        {
          color: COLORS.text,
          "--accent": COLORS.accent,
          background: GRADIENTS.detail,
        } as React.CSSProperties
      }
    >
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={() => setIsLoggedIn(true)}
      />
      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onAdd={() => {}}
        nextId={99}
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        `}
      </style>

      {/* Page nav */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#181A4B]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Link
            to="/works"
            className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-[var(--accent)] transition-colors"
          >
            ← Back to Works
          </Link>
          <p className="yarding-text text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            UI Component Library
          </p>
          <nav className="hidden md:flex gap-4 font-mono text-[10px] uppercase tracking-wider text-white/50">
            {[
              ["tokens", "Tokens"],
              ["header", "Header"],
              ["controls", "Controls"],
              ["cards", "Cards"],
              ["tools", "Tools"],
              ["modals", "Modals"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)] mb-3">
            Portfolio / Design System
          </p>
          <h1 className="tk-din-condensed text-5xl md:text-7xl uppercase leading-none text-white">
            Component Showcase
          </h1>
          <p className="publicSans-text mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Live previews of every custom component in the app — tokens, works
            chrome, cards, tools UI, and modal patterns. Use this page while
            rebuilding the library in <code className="text-[var(--accent)]">components/ui/</code>.
          </p>
        </header>

        <ShowcaseSection
          id="tokens"
          title="Design Tokens"
          description="Colors and typography from utils/theme.ts and custom.css."
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { name: "Primary", value: COLORS.primary },
              { name: "Secondary", value: COLORS.secondary },
              { name: "Accent", value: COLORS.accent },
              { name: "Text", value: COLORS.text },
              { name: "Dim border", value: COLORS.dim },
            ].map((swatch) => (
              <div key={swatch.name} className="border border-white/10 p-3 bg-white/5">
                <div
                  className="h-12 w-full mb-2 border border-white/20"
                  style={{ background: swatch.value }}
                />
                <p className="font-mono text-[10px] uppercase text-white/50">{swatch.name}</p>
                <p className="font-mono text-[10px] text-white/80 break-all">{swatch.value}</p>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
            Background gradients
          </p>
          <ShowcaseFullBleed>
            <div className="mb-6 space-y-4">
              <div>
                <p className="px-6 font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  Live preview — GRADIENTS.home
                </p>
                <div className="gradient-swatch gradient-swatch-home h-32 w-full" />
              </div>
              <div>
                <p className="px-6 font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  Live preview — GRADIENTS.detail
                </p>
                <div className="gradient-swatch gradient-swatch-detail h-32 w-full border-y border-white/20" />
              </div>
            </div>
          </ShowcaseFullBleed>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              {
                name: "Home / Works",
                token: "GRADIENTS.home",
                cssVar: "--gradient-home",
                swatchClass: "gradient-swatch-home",
              },
              {
                name: "Detail / Modal",
                token: "GRADIENTS.detail",
                cssVar: "--gradient-detail",
                swatchClass: "gradient-swatch-detail",
              },
            ].map((gradient) => (
              <div key={gradient.name} className="border border-white/10 p-3 bg-white/5">
                <div className="mb-3 rounded-sm bg-neutral-500/40 p-2">
                  <div
                    className={`gradient-swatch w-full rounded-sm border border-white/30 ${gradient.swatchClass}`}
                    role="img"
                    aria-label={`${gradient.name} gradient preview`}
                  />
                </div>
                <p className="font-mono text-[10px] uppercase text-white/50">{gradient.name}</p>
                <p className="font-mono text-[10px] text-[var(--accent)] mt-1">{gradient.token}</p>
                <p className="font-mono text-[10px] text-white/50 mt-1">{gradient.cssVar}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 border border-white/10 p-6 bg-white/5">
              <Logo className="max-w-[320px]" />
              <p className="yarding-text text-sm text-white/80 uppercase tracking-widest">Yarding — system labels</p>
              <p className="tk-din-condensed text-3xl uppercase text-white">DIN Condensed — titles</p>
              <p className="publicSans-text text-sm text-white/80">Public Sans — body & metadata</p>
              <p className="font-mono text-xs uppercase tracking-widest text-white/60">Mono — tags & diagnostics</p>
            </div>
            <div className="space-y-4 border border-white/10 p-6 bg-white/5">
              <a
                href="#"
                className="inline-block px-8 py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors din-normal"
              >
                Primary CTA
              </a>
              <button
                type="button"
                className="block border-2 border-[var(--accent)] px-8 py-4 text-white uppercase tracking-widest hover:bg-[var(--accent)] hover:text-black transition-colors font-bold"
              >
                Outline CTA
              </button>
              <button
                type="button"
                className="h-[38px] px-4 border border-white/20 text-xs publicSans-text uppercase tracking-wider text-white hover:border-white transition-colors"
              >
                Ghost / Sort style
              </button>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="header"
          title="Header"
          description="Works shell top bar — full-width, same as /works. SVG wordmark, tools/showcase links, login, work label."
        >
          <ShowcaseFullBleed>
            <Header
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setIsLoginOpen(true)}
              onLogoutClick={() => setIsLoggedIn(false)}
            />
          </ShowcaseFullBleed>
        </ShowcaseSection>

        <ShowcaseSection
          id="controls"
          title="Controls Bar"
          description="Search, sort dropdown, tray/grid toggle, skill tags, and admin add button."
        >
          <ShowcaseFullBleed>
            <Controls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeTags={activeTags}
              handleTagClick={handleTagClick}
              tagData={DEMO_TAGS}
              sortOption={sortOption}
              setSortOption={setSortOption}
              viewMode={viewMode}
              setViewMode={setViewMode}
              isLoggedIn={isLoggedIn}
              onAddProjectClick={() => setIsAddProjectOpen(true)}
            />
          </ShowcaseFullBleed>
          <p className="mt-4 font-mono text-[10px] text-white/40 uppercase tracking-wider">
            State: search="{searchTerm}" · tags=[{activeTags.join(", ")}] · sort={sortOption} · view={viewMode}
          </p>
        </ShowcaseSection>

        <ShowcaseSection
          id="cards"
          title="Works Cards & Chrome"
          description="Tray slot, grid card, hover tooltip, tray footer, and detail block patterns."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tray slot */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Tray slot</p>
              <div className="relative w-full max-w-[160px] h-[280px] border border-white/10 overflow-hidden bg-black/50">
                <div className="absolute inset-0 bottom-14 bg-[#0A0F33]/80" />
                <div className="absolute bottom-0 left-0 w-full h-14 bg-[var(--accent)] flex items-center justify-center">
                  <span className="text-2xl font-black font-sans text-black">{demoProject.idStr}</span>
                </div>
              </div>
            </div>

            {/* Tooltip preview */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Floating tooltip (tray hover)</p>
              <div
                className="w-72 bg-[#1a1a1a] border-2 p-1"
                style={{
                  borderColor: COLORS.accent,
                  boxShadow: `12px 12px 0px 0px ${COLORS.accent}80`,
                }}
              >
                {demoProject.image && (
                  <div className="w-full mb-2 bg-black flex items-center justify-center">
                    <img
                      src={demoProject.image}
                      alt={demoProject.title}
                      className="max-w-full max-h-32 object-contain"
                    />
                  </div>
                )}
                <div className="p-3 bg-black">
                  <h3 className="text-2xl tk-din-condensed font-black uppercase leading-none mb-1 text-[var(--accent)]">
                    {demoProject.title}
                  </h3>
                  <div className="h-px w-full bg-[#333] my-2" />
                  <p className="text-white text-xs font-mono uppercase opacity-70">{demoProject.skills}</p>
                </div>
              </div>
            </div>

            {/* Grid card */}
            <div className="lg:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Grid card</p>
              <div className="max-w-sm border border-white/10 bg-[#172067] bg-white/5 flex flex-col hover:border-[var(--accent)] transition-colors">
                <div className="w-full aspect-[4/3] overflow-hidden border-b border-[#333] bg-black">
                  {demoProject.image && (
                    <img
                      src={demoProject.image}
                      alt={demoProject.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex justify-between font-mono text-xs tracking-widest uppercase">
                    <span className="text-[var(--accent)]">{demoProject.projectLabel}</span>
                    <span className="text-white/30">{demoProject.time.slice(-4)}</span>
                  </div>
                  <h3 className="text-2xl tk-din-condensed uppercase text-white leading-none">{demoProject.title}</h3>
                  <p className="publicSans-text text-sm text-white/80 line-clamp-2">{demoProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {demoProject.skills.split("•").map((skill) => (
                      <span
                        key={skill}
                        className="border border-white/20 px-2 py-1 text-[10px] font-mono uppercase text-white"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detail block patterns */}
          <div className="mt-12 space-y-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Project detail blocks (static preview)</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/20 py-8">
              {[
                { label: "Project slots", value: "20" },
                { label: "Block types", value: "16" },
                { label: "Routes", value: "2" },
                { label: "Stack", value: "Vite" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl text-[var(--accent)] din-normal font-bold">{stat.value}</div>
                  <div className="text-xs text-white/70 uppercase tracking-widest publicSans-text mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <blockquote className="text-center max-w-2xl mx-auto">
              <p className="text-2xl md:text-3xl italic text-white/90 din-normal leading-tight">
                "A portfolio should feel like a place you wander."
              </p>
              <cite className="not-italic text-sm text-[var(--accent)] publicSans-text uppercase tracking-widest mt-4 block">
                — Design intent
              </cite>
            </blockquote>
          </div>

          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Tray footer</p>
            <Footer />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="tools"
          title="Tools Library"
          description="Status badges and tool cards from tools/components/."
        >
          <div className="flex flex-wrap gap-3 mb-8">
            <StatusBadge status="live" />
            <StatusBadge status="wip" />
            <StatusBadge status="prototype" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.slice(0, 2).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="modals"
          title="Modals"
          description="Login and add-project overlays used in the works shell."
        >
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="px-6 py-3 border border-white/20 font-mono text-xs uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Open LoginModal
            </button>
            <button
              type="button"
              onClick={() => setIsAddProjectOpen(true)}
              className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--accent)] hover:text-black transition-colors"
            >
              Open AddProjectModal
            </button>
            <Link
              to="/works/this-website"
              className="px-6 py-3 bg-[var(--accent)] text-black font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Full ProjectDetailModal →
            </Link>
          </div>
        </ShowcaseSection>
      </div>
    </div>
  );
}
