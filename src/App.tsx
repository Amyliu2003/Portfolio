import React, { useState, useMemo, useRef } from "react";
import { initialProjects, ProjectItem } from "./data/projects";
import { LoginModal } from "./components/LoginModal";
import { AddProjectModal } from "./components/AddProjectModal";
import { ProjectDetailModal } from "./components/ProjectDetailModal";
import { COLORS } from "./utils/theme";
import { LandingPage } from "./components/LandingPage";

// Components
import { Header } from "./components/Header";
import { Controls, SortOption } from "./components/Controls";
import { TrayView } from "./components/TrayView";
import { GridView } from "./components/GridView";
import { FloatingTooltip } from "./components/FloatingTooltip";

export default function App() {
  const [items, setItems] = useState<ProjectItem[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<ProjectItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<"tray" | "grid">("tray");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  // Auth & Modal State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const appSectionRef = useRef<HTMLDivElement>(null);

  const scrollToApp = () => {
    appSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate tags and their counts
  const tagData = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item: ProjectItem) => {
      if (item.type === "special" && item.skills) {
        const itemTags = item.skills.split(/[•,]/).map((t: string) => t.trim());
        itemTags.forEach((tag: string) => {
          if (tag && tag !== "[SKILL USED]") {
            counts[tag] = (counts[tag] || 0) + 1;
          }
        });
      }
    });
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  // Derived Sorted Items
  const sortedItems = useMemo(() => {
    let sorted = [...items];
    if (sortOption === "alphabetical") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "newest") {
      // Assuming higher ID is newer based on the data structure
      sorted.sort((a, b) => b.id - a.id);
    }
    // "default" keeps original order
    return sorted;
  }, [items, sortOption]);

  const handleTagClick = (tag: string) => {
    setActiveTags((prev: string[]) =>
      prev.includes(tag) ? prev.filter((t: string) => t !== tag) : [...prev, tag]
    );
    setSearchTerm("");
  };

  const handleAddProject = (newProject: ProjectItem) => {
    setItems((prev: ProjectItem[]) => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject: ProjectItem) => {
    setItems((prev: ProjectItem[]) =>
      prev.map((item: ProjectItem) => (item.id === updatedProject.id ? updatedProject : item))
    );
    setSelectedProject(updatedProject);
  };

  // Filter items for Grid View
  const filteredGridItems = sortedItems.filter((item: ProjectItem) => {
    if (item.type !== "special") return false;

    const query = searchTerm.toLowerCase();
    const matchesText =
      searchTerm === "" ||
      item.title.toLowerCase().includes(query) ||
      item.skills.toLowerCase().includes(query) ||
      item.projectLabel.toLowerCase().includes(query);

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.some((tag: string) => item.skills.includes(tag));

    return matchesText && matchesTags;
  });

  return (
    <div
      className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth font-['Tinos',_serif] selection:bg-[#BA76FF] selection:text-white"
      style={{
        background: 'linear-gradient(180deg, #1D5DE5 0%, #172FAB 14%, #181A4B 31%)',
        color: COLORS.text,
        "--accent": COLORS.accent,
      } as React.CSSProperties}
    >
      {/* Global Font Load */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Caesar+Dressing&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Underdog&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Warnes&display=swap');
        `}
      </style>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={() => setIsLoggedIn(true)}
      />

      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onAdd={handleAddProject}
        nextId={items.length + 1}
      />

      {/* PROJECT DETAIL PAGE OVERLAY */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        isAdmin={isLoggedIn}
        onUpdate={handleUpdateProject}
      />

      {/* SECTION 1: LANDING PAGE */}
      <section className="h-screen w-full snap-start relative shrink-0">
        <LandingPage onScrollDown={scrollToApp} />
      </section>

      {/* SECTION 2: APP INTERFACE */}
      <section 
        ref={appSectionRef}
        className="h-screen w-full snap-start flex flex-col relative shrink-0 overflow-hidden"
      >
        {/* Floating Tooltip (Only for Tray Mode) */}
        <FloatingTooltip
          hoveredItem={hoveredItem}
          viewMode={viewMode}
          selectedProject={selectedProject}
        />

        {/* Header */}
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setIsLoginOpen(true)}
          onLogoutClick={() => setIsLoggedIn(false)}
        />

        {/* Main Area: Controls + Content */}
        <main className="flex-grow flex flex-col w-full overflow-hidden relative">
          <Controls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTags={activeTags}
            handleTagClick={handleTagClick}
            tagData={tagData}
            sortOption={sortOption}
            setSortOption={setSortOption}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isLoggedIn={isLoggedIn}
            onAddProjectClick={() => setIsAddProjectOpen(true)}
          />

          {/* View Content Switcher */}
          {viewMode === "tray" ? (
            <TrayView
              items={sortedItems}
              searchTerm={searchTerm}
              activeTags={activeTags}
              onSelectProject={setSelectedProject}
              setHoveredItem={setHoveredItem}
            />
          ) : (
            <GridView
              items={filteredGridItems}
              onSelectProject={setSelectedProject}
            />
          )}
        </main>
      </section>
    </div>
  );
}
