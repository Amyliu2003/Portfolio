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
  const [items, setItems] =
    useState<ProjectItem[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] =
    useState<ProjectItem | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<"tray" | "grid">(
    "tray",
  );
  const [sortOption, setSortOption] =
    useState<SortOption>("default");

  // Auth & Modal State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] =
    useState(false);

  const appSectionRef = useRef<HTMLDivElement>(null);

  const scrollToApp = () => {
    appSectionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const tagData = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      if (item.type === "special" && item.skills) {
        const itemTags = item.skills
          .split(/[•,]/)
          .map((t) => t.trim());
        itemTags.forEach((tag) => {
          if (tag && tag !== "[SKILL USED]") {
            counts[tag] = (counts[tag] || 0) + 1;
          }
        });
      }
    });
    return Object.entries(counts).sort((a, b) => {
      // Sort by count descending
      const countDiff = b[1] - a[1];
      if (countDiff !== 0) return countDiff;
      // Then alphabetically
      return a[0].localeCompare(b[0]);
    });
  }, [items]);

  // Derived Sorted Items
  const sortedItems = useMemo(() => {
    let sorted = [...items];
    if (sortOption === "alphabetical" || sortOption === "default") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "newest") {
      // the time: xxx 2026 so the parsing needs to get the year at the end and convert to int 
      //using parseInt to convert string to number and subtract to get descending order
      const time_difference = (a: ProjectItem, b: ProjectItem) => parseInt(b.time.substring(b.time.length - 4)) - parseInt(a.time.substring(a.time.length - 4));
      sorted.sort(time_difference);
    }
    // "default" keeps original order
    return sorted;
  }, [items, sortOption]);

  const handleTagClick = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag],
    );
    setSearchTerm("");
  };

  const handleAddProject = (newProject: ProjectItem) => {
    setItems((prev) => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject: ProjectItem) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === updatedProject.id ? updatedProject : item,
      ),
    );
    setSelectedProject(updatedProject);
  };

  const navigableProjects = useMemo(() => {
    return sortedItems.filter(item => item.type === 'special');
  }, [sortedItems]);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = navigableProjects.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % navigableProjects.length;
    setSelectedProject(navigableProjects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = navigableProjects.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + navigableProjects.length) % navigableProjects.length;
    setSelectedProject(navigableProjects[prevIndex]);
  };

  // Filter items for Grid View
  const filteredGridItems = sortedItems.filter((item) => {
    if (item.type !== "special") return false;

    const query = searchTerm.toLowerCase();
    const matchesText =
      searchTerm === "" ||
      item.title.toLowerCase().includes(query) ||
      item.skills.toLowerCase().includes(query) ||
      item.projectLabel.toLowerCase().includes(query);

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.some((tag) => item.skills.includes(tag));

    return matchesText && matchesTags;
  });

  return (
    <div
      className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth font-['Tinos',_serif] selection:bg-[#BA76FF] selection:text-white"
      style={
        {
          color: COLORS.text,
          "--accent": COLORS.accent,
        } as React.CSSProperties
      }
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

      {/* Background Wrapper */}
      <div
        className="min-h-full w-full flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, rgba(186, 118, 255, 0.30) 0%, rgba(186, 118, 255, 0.00) 20%), linear-gradient(180deg, #D5DCD9 0%, #83C1E6 20%, #1D5DE5 40%, #172FAB 56%, #181A4B 80%)",
        }}
      >
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
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />

        {/* SECTION 1: LANDING PAGE */}
        <section className="w-full snap-start relative shrink-0">
          <LandingPage onScrollDown={scrollToApp} />
        </section>

        {/* SECTION 2: APP INTERFACE */}
        <section
          ref={appSectionRef}
          className={`${viewMode === "tray" ? "h-screen overflow-hidden" : "min-h-screen"} w-full snap-start flex flex-col relative shrink-0`}
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
          <main className="flex-grow flex flex-col w-full relative">
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
              onAddProjectClick={() =>
                setIsAddProjectOpen(true)
              }
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
    </div>
  );
}