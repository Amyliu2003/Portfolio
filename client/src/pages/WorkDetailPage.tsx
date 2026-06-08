import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAdjacentProjectSlugs,
  getProjectBySlug,
} from "../data/projects-helpers";
import { ProjectDetailModal } from "../components/ProjectDetailModal";

export function WorkDetailPage() {
  const { project_name = "" } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(project_name);
  const { prev, next } = getAdjacentProjectSlugs(project_name);

  if (!project) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-[#181A4B] text-white">
        <div className="text-center space-y-4">
          <p className="font-mono uppercase tracking-widest text-sm opacity-70">
            Project unavailable
          </p>
          <Link
            to="/works"
            className="inline-block px-6 py-3 border border-[#BA76FF] text-[#BA76FF] uppercase font-mono text-xs tracking-widest hover:bg-[#BA76FF] hover:text-black transition-colors"
          >
            Back to Works
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ProjectDetailModal
      project={project}
      isOpen
      onClose={() => navigate("/works")}
      isAdmin={false}
      onUpdate={() => {}}
      onNext={() => next && navigate(`/works/${next}`)}
      onPrev={() => prev && navigate(`/works/${prev}`)}
    />
  );
}
