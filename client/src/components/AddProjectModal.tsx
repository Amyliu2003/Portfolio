import React, { useState } from "react";
import { motion } from "motion/react";
import TextareaAutosize from 'react-textarea-autosize';
import { ProjectItem } from "../data/projects";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: ProjectItem) => void;
  nextId: number;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  nextId,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    role: "",
    description: "",
    customHtml: "",
    image: "",
    link: "",
    githubLink: "",
  });

  // Helper to convert file to base64
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const idStr = nextId < 10 ? `0${nextId}` : `${nextId}`;
    
    const newProject: ProjectItem = {
      id: nextId,
      idStr,
      projectLabel: `PROJECT ${idStr}`,
      type: "special",
      title: formData.title,
      skills: formData.skills,
      role: formData.role || "Creative Technologist • Developer",
      description: formData.description,
      customHtml: formData.customHtml,
      image: formData.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200", // Default fallback
      link: formData.link || null,
      githubLink: formData.githubLink || null,
    };

    onAdd(newProject);
    onClose();
    setFormData({ title: "", skills: "", role: "", description: "", customHtml: "", image: "", link: "", githubLink: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#0a0a0a] border border-[#333] p-8 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="text-3xl font-black italic uppercase text-white mb-8 tracking-tighter">
          Add New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                Project Title
              </label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono"
                placeholder="MY NEW PROJECT"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                Tech Stack ( • separated)
              </label>
              <input
                required
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono"
                placeholder="React • Node • AI"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
              Role
            </label>
            <input
              required
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono"
              placeholder="Creative Technologist • Developer"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
              Description
            </label>
            <TextareaAutosize
              required
              minRows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono resize-none selection:bg-[var(--accent)] selection:text-black"
              placeholder="Project details..."
            />
          </div>

          <div>
             <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
               Custom HTML (Optional)
             </label>
             <TextareaAutosize
               minRows={3}
               value={formData.customHtml}
               onChange={(e) => setFormData({ ...formData, customHtml: e.target.value })}
               className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono font-xs resize-none selection:bg-[var(--accent)] selection:text-black"
               placeholder="<div>Custom content...</div>"
             />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                Project Image
              </label>
              
               {/* File Upload Button */}
               <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#333] hover:border-[var(--accent)] cursor-pointer transition-colors mb-2 group/upload bg-[#1a1a1a]">
                  <div className="text-center">
                    <span className="block text-xs font-mono uppercase text-white/50 group-hover/upload:text-white">Click to Upload Image</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if(file) handleImageUpload(file);
                    }}
                  />
               </label>
               
               <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono text-white/30 uppercase">OR URL:</span>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-grow bg-[#1a1a1a] border border-[#333] text-white px-2 py-2 text-xs font-mono focus:border-[#BA76FF] outline-none"
                    placeholder="https://..."
                  />
               </div>
               
               {formData.image && (
                  <div className="w-full aspect-video border border-[#333] overflow-hidden bg-black">
                     <img src={formData.image} alt="Preview" className="w-full h-full object-cover opacity-70" />
                  </div>
               )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                Live Link (Optional)
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                GitHub / Repo Link (Optional)
              </label>
              <input
                type="url"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#BA76FF] text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors duration-300"
          >
            Create Project
          </button>
        </form>
      </motion.div>
    </div>
  );
};
